import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import DashboardUpload from '../components/DashboardUpload'
import GuestModal from '../components/GuestModal'

const DashboardPage = () => {
    const [guests, setGuests] = useState([])
    const [rsvps, setRsvps] = useState([])
    const [loading, setLoading] = useState(true)
    const [copiedSlug, setCopiedSlug] = useState(null)

    // CRUD State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingGuest, setEditingGuest] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchGuests()
        fetchRSVPs()

        // Real-time subscription for RSVPs
        const channelName = `rsvps_${Date.now()}`
        const subscription = supabase
            .channel(channelName)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'rsvps' }, () => {
                fetchRSVPs()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(subscription)
        }
    }, [])

    const fetchGuests = async () => {
        const { data, error } = await supabase
            .from('guests')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setGuests(data)
        }
    }

    const fetchRSVPs = async () => {
        const { data, error } = await supabase
            .from('rsvps')
            .select(`
            *,
            guests (family_name)
        `)
            .order('created_at', { ascending: false })

        if (!error && data) {
            setRsvps(data)
        }
        setLoading(false)
    }

    const copyLink = (slug) => {
        const link = `${window.location.origin}/invite/${slug}`
        navigator.clipboard.writeText(link)
        setCopiedSlug(slug)
        setTimeout(() => setCopiedSlug(null), 2000)
    }

    // --- CRUD Operations ---
    const handleAddGuest = () => {
        setEditingGuest(null);
        setIsModalOpen(true);
    };

    const handleEditGuest = (guest) => {
        setEditingGuest(guest);
        setIsModalOpen(true);
    };

    const handleDeleteGuest = async (id, familyName) => {
        if (!window.confirm(`Are you sure you want to delete ${familyName}? This action cannot be undone.`)) return;

        try {
            // First delete associated RSVPs to avoid foreign key constraint errors
            const { error: rsvpError } = await supabase
                .from('rsvps')
                .delete()
                .eq('guest_id', id);

            if (rsvpError) throw rsvpError;

            // Then delete the guest
            const { error: guestError } = await supabase
                .from('guests')
                .delete()
                .eq('id', id);

            if (guestError) throw guestError;

            fetchRSVPs(); // Refresh list to remove their rsvp visually
            fetchGuests(); // Refresh guest list
        } catch (error) {
            alert('Error deleting guest: ' + error.message);
        }
    };

    const handleSaveGuest = async (guestData) => {
        setIsSaving(true);
        try {
            if (editingGuest) {
                // Update
                const { error } = await supabase
                    .from('guests')
                    .update({
                        family_name: guestData.family_name,
                        max_attendees: guestData.max_attendees
                    })
                    .eq('id', editingGuest.id);

                if (error) throw error;
            } else {
                // Insert new guest manually
                // We generate a fallback slug if the schema requires it, using timestamp for uniqueness
                const slug = guestData.family_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);

                const { error } = await supabase
                    .from('guests')
                    .insert([{
                        family_name: guestData.family_name,
                        max_attendees: guestData.max_attendees,
                        invite_slug: slug
                    }]);

                if (error) throw error;
            }

            setIsModalOpen(false);
            fetchGuests(); // Refresh list
        } catch (error) {
            alert('Error saving guest: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Build a set of guest IDs that have RSVPed
    const rsvpedGuestIds = new Set(rsvps.map(r => r.guest_id))

    const totalAttendees = rsvps.reduce((sum, rsvp) => sum + (rsvp.num_attending || 0), 0)

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-playfair mb-8 text-gray-800">Wedding Dashboard</h1>

                {/* Upload Section */}
                <DashboardUpload onUploadComplete={fetchGuests} />

                {/* Guest List */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Guest List ({guests.length})</h2>
                        <button
                            onClick={handleAddGuest}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Guest
                        </button>
                    </div>
                    {guests.length === 0 ? (
                        <p className="text-gray-500">No guests yet. Upload a CSV above.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-3 font-semibold">Family Name</th>
                                        <th className="p-3 font-semibold">Max Guests</th>
                                        <th className="p-3 font-semibold">Status</th>
                                        <th className="p-3 font-semibold">Invite Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map(guest => (
                                        <tr key={guest.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{guest.family_name}</td>
                                            <td className="p-3">{guest.max_attendees}</td>
                                            <td className="p-3">
                                                {rsvpedGuestIds.has(guest.id) ? (
                                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Responded</span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={`/invite/${guest.invite_slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:underline text-xs font-mono"
                                                    >
                                                        /invite/{guest.invite_slug}
                                                    </a>
                                                    <button
                                                        onClick={() => copyLink(guest.invite_slug)}
                                                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
                                                        title="Copy invite link"
                                                    >
                                                        {copiedSlug === guest.invite_slug ? '✓' : 'Copy'}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() => handleEditGuest(guest)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit Guest"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteGuest(guest.id, guest.family_name)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete Guest"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* RSVPs Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">RSVPs ({rsvps.length})</h2>
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200 shadow-sm">
                            <span className="text-sm font-medium uppercase tracking-wider opacity-75 mr-2">Total Attendees:</span>
                            <span className="text-2xl font-black">{totalAttendees}</span>
                        </div>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="space-y-4">
                            {rsvps.length === 0 ? <p className="text-gray-500">No RSVPs yet. Share invite links with your guests!</p> : null}
                            {rsvps.map(rsvp => (
                                <div key={rsvp.id} className={`p-4 rounded border-l-4 ${rsvp.attending ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                    <p className="font-bold">{rsvp.guests?.family_name || 'Unknown Guest'}</p>
                                    <p>{rsvp.attending ? `Accepted (${rsvp.num_attending} attending)` : 'Declined'}</p>
                                    {rsvp.guest_names && <p className="text-sm mt-1"><strong>Guests:</strong> {rsvp.guest_names}</p>}
                                    {rsvp.dietary_notes && <p className="text-sm mt-1 text-gray-600"><strong>Note:</strong> {rsvp.dietary_notes}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Guest Add/Edit Modal */}
            <GuestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGuest}
                guest={editingGuest}
                isLoading={isSaving}
            />
        </div>
    )
}

export default DashboardPage
