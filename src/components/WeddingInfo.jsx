import React from 'react'
import { motion } from 'framer-motion'

const WeddingInfo = () => {
    return (
        <section className="py-20 px-6 bg-wedding-cream text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
            >
                <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto">Celebration Details</p>
                <h2 className="text-4xl font-playfair text-wedding-text mb-12">The Details</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                    >
                        <div className="text-wedding-gold text-2xl mb-3">📅</div>
                        <h3 className="text-xl font-playfair font-bold mb-2 text-wedding-text">When</h3>
                        <p className="font-roboto text-wedding-text-light">October 15, 2026</p>
                        <p className="font-roboto text-wedding-text-light">4:00 PM Ceremony</p>
                    </motion.div>
                    <motion.div
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="text-wedding-gold text-2xl mb-3">📍</div>
                        <h3 className="text-xl font-playfair font-bold mb-2 text-wedding-text">Where</h3>
                        <p className="font-roboto text-wedding-text-light">The Grand Garden Estate</p>
                        <p className="font-roboto text-wedding-text-light">123 Wedding Lane, Cityville</p>
                    </motion.div>
                    <motion.div
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="text-wedding-gold text-2xl mb-3">🥂</div>
                        <h3 className="text-xl font-playfair font-bold mb-2 text-wedding-text">Reception</h3>
                        <p className="font-roboto text-wedding-text-light">Dinner & Dancing</p>
                        <p className="font-roboto text-wedding-text-light">to follow immediately</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default WeddingInfo
