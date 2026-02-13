import React from 'react'
import { motion } from 'framer-motion'

const Hero = ({ guestName, maxAttendees }) => {
    return (
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-wedding-text text-white">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-40"></div>
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-wedding-text/30 to-wedding-text/60"></div>

            <div className="relative z-10 p-6 max-w-2xl">
                <motion.p
                    className="text-sm uppercase tracking-[0.3em] text-wedding-champagne mb-4 font-roboto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Together with their families
                </motion.p>
                <motion.h1
                    className="text-5xl md:text-7xl font-playfair mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Sarah
                </motion.h1>
                <motion.p
                    className="text-2xl font-playfair text-wedding-champagne my-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    &
                </motion.p>
                <motion.h1
                    className="text-5xl md:text-7xl font-playfair mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    Michael
                </motion.h1>
                <motion.p
                    className="text-lg font-playfair text-wedding-sage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    Request the pleasure of your company
                </motion.p>
                <motion.div
                    className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-wedding-champagne/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <p className="text-lg font-roboto">
                        Dear <span className="font-bold text-wedding-champagne">{guestName} Family</span>,
                    </p>
                    <p className="mt-2 text-sm font-light text-wedding-sage">
                        You and up to {maxAttendees} guests are invited to celebrate with us.
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <span className="text-xs uppercase tracking-[0.2em] text-wedding-champagne/70">Scroll Down</span>
            </motion.div>
        </section>
    )
}

export default Hero
