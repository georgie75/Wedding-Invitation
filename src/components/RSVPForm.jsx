import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

const RSVPForm = ({ guestId, maxAttendees }) => {
    const [attending, setAttending] = useState(null) // true, false, or null
    const [numAttending, setNumAttending] = useState(1)
    const [guestNames, setGuestNames] = useState('')
    const [dietaryNotes, setDietaryNotes] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const { error } = await supabase
                .from('rsvps')
                .upsert(formData)
            if (error) throw error
            return true
        },
        onSuccess: () => {
            setSubmitted(true)
        },
        onError: (error) => {
            alert('Error submitting RSVP: ' + error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (attending === null) return

        const data = {
            guest_id: guestId,
            attending,
            num_attending: attending ? parseInt(numAttending) : 0,
            guest_names: guestNames,
            dietary_notes: dietaryNotes
        }
        mutation.mutate(data)
    }

    if (submitted) {
        return (
            <motion.div
                className="py-20 px-6 text-center bg-pink-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2 className="text-3xl font-playfair mb-4">Thank You!</h2>
                <p className="font-roboto text-gray-700">Your RSVP has been received.</p>
                {attending ? (
                    <p className="mt-2 text-green-600 font-bold">We can't wait to see you!</p>
                ) : (
                    <p className="mt-2 text-gray-500">We will miss you!</p>
                )}
            </motion.div>
        )
    }

    return (
        <section className="py-20 px-6 bg-pink-50" id="rsvp">
            <motion.div
                className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-playfair text-center mb-8">RSVP</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setAttending(true)}
                            className={`px-6 py-2 rounded-full border transition-colors ${attending === true ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            Joyfully Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => setAttending(false)}
                            className={`px-6 py-2 rounded-full border transition-colors ${attending === false ? 'bg-red-100 border-red-500 text-red-700' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            Regretfully Decline
                        </button>
                    </div>

                    {attending === true && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number Attending (Max {maxAttendees})</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={maxAttendees}
                                    value={numAttending}
                                    onChange={(e) => setNumAttending(Math.min(parseInt(e.target.value) || 0, maxAttendees))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Guest Names</label>
                                <textarea
                                    value={guestNames}
                                    onChange={(e) => setGuestNames(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2"
                                    rows="2"
                                    placeholder="Please list names of all attendees"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Dietary Restrictions / Notes</label>
                                <textarea
                                    value={dietaryNotes}
                                    onChange={(e) => setDietaryNotes(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2"
                                    rows="2"
                                />
                            </div>
                        </motion.div>
                    )}

                    {attending === false && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-center text-gray-600 italic">We are sorry you can't make it.</p>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Message to the Couple (Optional)</label>
                                <textarea
                                    value={dietaryNotes} // Reuse specific field or add new column for message
                                    onChange={(e) => setDietaryNotes(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2"
                                    rows="2"
                                />
                            </div>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={attending === null || mutation.isPending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {mutation.isPending ? 'Sending...' : 'Send RSVP'}
                    </button>
                </form>
            </motion.div>
        </section>
    )
}

export default RSVPForm
