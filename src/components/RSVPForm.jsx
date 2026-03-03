import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'
import { useLanguage } from '../context/LanguageContext'

/* ── Decorative separator ── */
const GoldLine = () => (
    <div className="flex items-center justify-center gap-4 my-8">
        <div className="h-px w-16 bg-wedding-gold/40" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="#C4A44E" opacity="0.6" />
        </svg>
        <div className="h-px w-16 bg-wedding-gold/40" />
    </div>
)

/* ── Royal Success Crest ── */
const RSVPFlourish = ({ attending }) => (
    <div className="flex justify-center mb-8 text-wedding-gold">
        <svg width="84" height="84" viewBox="0 0 100 100" fill="none" className="drop-shadow-sm">
            {/* Elegant Diamond Frame */}
            <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 12 L88 50 L50 88 L12 50 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />

            {attending ? (
                /* Elegant Checkmark */
                <path d="M38 52 L46 60 L64 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                /* Elegant Envelope */
                <path d="M34 42 L50 54 L66 42 M34 42 L34 58 L66 58 L66 42 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            )}

            <circle cx="50" cy="5" r="2" fill="currentColor" />
            <circle cx="50" cy="95" r="2" fill="currentColor" />
            <circle cx="5" cy="50" r="2" fill="currentColor" />
            <circle cx="95" cy="50" r="2" fill="currentColor" />
        </svg>
    </div>
)

const RSVPForm = ({ guestId, maxAttendees }) => {
    const { t } = useLanguage()
    const [attending, setAttending] = useState(null)
    const [numAttending, setNumAttending] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)

    // Check if guest already RSVP'd
    React.useEffect(() => {
        const checkExistingRSVP = async () => {
            try {
                const { data, error } = await supabase
                    .from('rsvps')
                    .select('*')
                    .eq('guest_id', guestId)
                    .single()

                if (data) {
                    setAttending(data.attending)
                    setNumAttending(data.num_attending)
                    setSubmitted(true)
                }
            } catch (err) {
                // Ignore errors (e.g. no rows found is expected if they haven't RSVP'd)
            } finally {
                setInitialLoading(false)
            }
        }

        if (guestId) {
            checkExistingRSVP()
        } else {
            setInitialLoading(false)
        }
    }, [guestId])

    const [confirming, setConfirming] = useState(false)

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
            setConfirming(false)
        },
        onError: (error) => {
            alert('Error submitting RSVP: ' + error.message)
            setConfirming(false)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (attending === null || submitted) return
        // Show confirmation step instead of submitting immediately
        setConfirming(true)
    }

    const handleConfirm = () => {
        const data = {
            guest_id: guestId,
            attending,
            num_attending: attending ? parseInt(numAttending) : 0,
        }
        mutation.mutate(data)
    }

    return (
        <section className="h-screen flex items-center justify-center bg-wedding-cream px-6" id="rsvp">
            <motion.div
                className="w-full max-w-md text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    {initialLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center justify-center min-h-[300px]"
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-wedding-gold border-t-transparent animate-spin mb-4" />
                            <p className="text-wedding-text-light font-playfair italic text-sm tracking-widest uppercase">
                                Loading...
                            </p>
                        </motion.div>
                    ) : submitted ? (
                        /* ── Success State ── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            >
                                <RSVPFlourish attending={attending} />
                            </motion.div>
                            <h2 className="text-4xl font-playfair text-wedding-text mb-3">{t('rsvpSuccess')}</h2>
                            <GoldLine />
                            <p className="font-roboto text-wedding-text-light text-lg">
                                {t('rsvpSuccessMessage')}
                            </p>
                        </motion.div>
                    ) : confirming ? (
                        /* ── Confirmation Step ── */
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="py-12"
                        >
                            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-4 font-roboto">Please Confirm</p>
                            <h2 className="font-playfair text-wedding-text text-2xl mb-2">
                                {attending ? 'Joyfully Attending' : 'Regretfully Declining'}
                            </h2>
                            <GoldLine />
                            {attending && (
                                <p className="font-roboto text-wedding-text-light text-base mb-6">
                                    {numAttending} {numAttending === 1 ? 'guest' : 'guests'} attending
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setConfirming(false)}
                                    className="px-6 py-2 rounded-full border border-wedding-tan text-wedding-text-light font-roboto text-sm hover:border-wedding-gold/60 transition-all"
                                    disabled={mutation.isPending}
                                >
                                    Go Back
                                </button>
                                <motion.button
                                    type="button"
                                    onClick={handleConfirm}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={mutation.isPending}
                                    className="px-8 py-3 rounded-full bg-wedding-gold text-white font-playfair text-base tracking-wide shadow-lg hover:bg-wedding-gold/90 transition-colors disabled:opacity-60 flex items-center gap-2"
                                >
                                    {mutation.isPending && (
                                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    )}
                                    Confirm RSVP
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        /* ── Form State ── */
                        <motion.div
                            key="form"
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {/* Header */}
                            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto">
                                {t('replyBy')}
                            </p>
                            <h2
                                className="text-wedding-text mb-2"
                                style={{
                                    fontFamily: "'Pinyon Script', cursive",
                                    fontSize: "clamp(2.5rem, 8vw, 4rem)",
                                }}
                            >
                                {t('rsvpTitle')}
                            </h2>
                            <GoldLine />

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Attending Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={() => setAttending(true)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`px-8 py-3 rounded-full border-2 transition-all duration-300 font-playfair text-base tracking-wide ${attending === true
                                            ? 'bg-wedding-gold border-wedding-gold text-white shadow-lg'
                                            : 'border-wedding-tan text-wedding-text-light hover:border-wedding-gold/60'
                                            }`}
                                    >
                                        {t('yesAttending')}
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setAttending(false)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`px-8 py-3 rounded-full border-2 transition-all duration-300 font-playfair text-base tracking-wide ${attending === false
                                            ? 'bg-wedding-text border-wedding-text text-white shadow-lg'
                                            : 'border-wedding-tan text-wedding-text-light hover:border-wedding-text/40'
                                            }`}
                                    >
                                        {t('noDeclining')}
                                    </motion.button>
                                </div>

                                {/* Number of Guests */}
                                <AnimatePresence>
                                    {attending === true && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-wedding-champagne/30 rounded-xl p-6 border border-wedding-tan/20">
                                                <label className="block text-sm font-playfair text-wedding-text mb-3 tracking-wide">
                                                    {t('confirmNumber')}
                                                </label>
                                                <div className="flex items-center justify-center gap-4">
                                                    <motion.button
                                                        type="button"
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setNumAttending(Math.max(1, numAttending - 1))}
                                                        className="w-10 h-10 rounded-full border-2 border-wedding-gold/50 text-wedding-gold flex items-center justify-center text-xl hover:bg-wedding-gold/10 transition-colors"
                                                    >
                                                        −
                                                    </motion.button>
                                                    <span
                                                        className="text-wedding-text font-playfair w-12 text-center"
                                                        style={{ fontSize: "2rem" }}
                                                    >
                                                        {numAttending}
                                                    </span>
                                                    <motion.button
                                                        type="button"
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setNumAttending(Math.min(maxAttendees, numAttending + 1))}
                                                        className="w-10 h-10 rounded-full border-2 border-wedding-gold/50 text-wedding-gold flex items-center justify-center text-xl hover:bg-wedding-gold/10 transition-colors"
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                                <p className="mt-2 text-xs text-wedding-text-light font-roboto">
                                                    {t('canBringUpTo')} {maxAttendees} {t('guests')}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Decline message */}
                                <AnimatePresence>
                                    {attending === false && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-wedding-text-light italic font-playfair"
                                        >
                                            We understand, and we'll miss you.
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={attending === null || mutation.isPending}
                                    whileHover={{ scale: attending !== null ? 1.02 : 1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-full text-sm font-playfair uppercase tracking-[0.2em] text-white bg-wedding-gold shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {mutation.isPending ? t('submitting') : t('submitRsvp')}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}

export default RSVPForm
