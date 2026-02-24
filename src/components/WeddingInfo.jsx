import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
}

const WeddingInfo = () => {
    return (
        <section className="h-screen flex items-center justify-center bg-wedding-cream text-center px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-3xl mx-auto"
            >
                <motion.p
                    custom={0}
                    variants={fadeUp}
                    className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto"
                >
                    Celebration Details
                </motion.p>
                <motion.h2
                    custom={0.1}
                    variants={fadeUp}
                    className="text-4xl font-playfair text-wedding-text mb-12"
                >
                    The Details
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        custom={0.2}
                        variants={fadeUp}
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
                    >
                        <div className="text-wedding-gold text-2xl mb-3">📅</div>
                        <h3 className="text-xl font-playfair font-bold mb-2 text-wedding-text">When</h3>
                        <p className="font-roboto text-wedding-text-light">March 28, 2026</p>
                        <p className="font-roboto text-wedding-text-light">4:00 PM Ceremony</p>
                    </motion.div>
                    <motion.div
                        custom={0.35}
                        variants={fadeUp}
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
                    >
                        <div className="text-wedding-gold text-2xl mb-3">📍</div>
                        <h3 className="text-xl font-playfair font-bold mb-2 text-wedding-text">Where</h3>
                        <p className="font-roboto text-wedding-text-light">The Grand Garden Estate</p>
                        <p className="font-roboto text-wedding-text-light">123 Wedding Lane, Cityville</p>
                    </motion.div>
                    <motion.div
                        custom={0.5}
                        variants={fadeUp}
                        className="p-8 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30"
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
