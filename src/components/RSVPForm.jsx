import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

const RSVPForm = ({ guestId, maxAttendees }) => {
    const [attending, setAttending] = useState(null)
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
                className="py-20 px-6 text-center bg-wedding-sage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2 className="text-3xl font-playfair mb-4 text-wedding-text">Thank You!</h2>
                <p className="font-roboto text-wedding-text-light">Your RSVP has been received.</p>
                {attending ? (
                    <p className="mt-2 text-wedding-gold font-bold">We can't wait to see you!</p>
                ) : (
                    <p className="mt-2 text-wedding-text-light">We will miss you!</p>
                )}
            </motion.div>
        )
    }

    return (
        <section className="py-20 px-6 bg-wedding-sage" id="rsvp">
            <motion.div
                className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-wedding-tan/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto text-center">Kindly Respond</p>
                <h2 className="text-3xl font-playfair text-center mb-8 text-wedding-text">RSVP</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setAttending(true)}
                            className={`px-6 py-2 rounded-full border transition-colors font-roboto text-sm ${attending === true ? 'bg-wedding-champagne border-wedding-gold text-wedding-text' : 'border-wedding-tan text-wedding-text-light hover:bg-wedding-cream'}`}
                        >
                            Joyfully Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => setAttending(false)}
                            className={`px-6 py-2 rounded-full border transition-colors font-roboto text-sm ${attending === false ? 'bg-wedding-tan border-wedding-text-light text-wedding-text' : 'border-wedding-tan text-wedding-text-light hover:bg-wedding-cream'}`}
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
                                <label className="block text-sm font-medium text-wedding-text">Number Attending (Max {maxAttendees})</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={maxAttendees}
                                    value={numAttending}
                                    onChange={(e) => setNumAttending(Math.min(parseInt(e.target.value) || 0, maxAttendees))}
                                    className="mt-1 block w-full rounded-md border-wedding-tan shadow-sm focus:border-wedding-gold focus:ring-wedding-gold border p-2 bg-wedding-cream/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-wedding-text">Guest Names</label>
                                <textarea
                                    value={guestNames}
                                    onChange={(e) => setGuestNames(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-wedding-tan shadow-sm focus:border-wedding-gold focus:ring-wedding-gold border p-2 bg-wedding-cream/50"
                                    rows="2"
                                    placeholder="Please list names of all attendees"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-wedding-text">Dietary Restrictions / Notes</label>
                                <textarea
                                    value={dietaryNotes}
                                    onChange={(e) => setDietaryNotes(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-wedding-tan shadow-sm focus:border-wedding-gold focus:ring-wedding-gold border p-2 bg-wedding-cream/50"
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
                            <p className="text-center text-wedding-text-light italic">We are sorry you can't make it.</p>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-wedding-text">Message to the Couple (Optional)</label>
                                <textarea
                                    value={dietaryNotes}
                                    onChange={(e) => setDietaryNotes(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-wedding-tan shadow-sm focus:border-wedding-gold focus:ring-wedding-gold border p-2 bg-wedding-cream/50"
                                    rows="2"
                                />
                            </div>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={attending === null || mutation.isPending}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wedding-gold hover:bg-wedding-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wedding-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {mutation.isPending ? 'Sending...' : 'Send RSVP'}
                    </button>
                </form>
            </motion.div>
        </section>
    )
}

export default RSVPForm
