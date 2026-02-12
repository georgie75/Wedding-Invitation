import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import DashboardUpload from '../components/DashboardUpload'

const DashboardPage = () => {
    const [rsvps, setRsvps] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRSVPs()

        // Real-time subscription
        const subscription = supabase
            .channel('rsvps')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'rsvps' }, payload => {
                console.log('Change received!', payload)
                fetchRSVPs() // Re-fetch on any change
            })
            .subscribe()

        return () => {
            supabase.removeChannel(subscription)
        }
    }, [])

    const fetchRSVPs = async () => {
        const { data, error } = await supabase
            .from('rsvps')
            .select(`
            *,
            guests (family_name)
        `)
            .order('created_at', { ascending: false })

        if (!error) {
            setRsvps(data)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-playfair mb-8 text-gray-800">Wedding Dashboard</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <DashboardUpload />
                    </div>

                    <div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Recent RSVPs</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="space-y-4">
                                    {rsvps.length === 0 ? <p className="text-gray-500">No RSVPs yet.</p> : null}
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
            </div>
        </div>
    )
}


export default DashboardPage
