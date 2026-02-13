import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import DashboardUpload from '../components/DashboardUpload'

const DashboardPage = () => {
    const [guests, setGuests] = useState([])
    const [rsvps, setRsvps] = useState([])
    const [loading, setLoading] = useState(true)
    const [copiedSlug, setCopiedSlug] = useState(null)

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

    // Build a set of guest IDs that have RSVPed
    const rsvpedGuestIds = new Set(rsvps.map(r => r.guest_id))

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-playfair mb-8 text-gray-800">Wedding Dashboard</h1>

                {/* Upload Section */}
                <DashboardUpload onUploadComplete={fetchGuests} />

                {/* Guest List */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold mb-4">Guest List ({guests.length})</h2>
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
                                                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                                    >
                                                        {copiedSlug === guest.invite_slug ? '✓ Copied!' : 'Copy'}
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
                    <h2 className="text-xl font-bold mb-4">RSVPs ({rsvps.length})</h2>
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
        </div>
    )
}

export default DashboardPage
