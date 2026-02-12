import React from 'react'
import { motion } from 'framer-motion'

const Hero = ({ guestName, maxAttendees }) => {
    return (
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gray-900 text-white">
            {/* Background Image Placeholder - ideally this would be a real image */}
            <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-50"></div>

            <div className="relative z-10 p-6 max-w-2xl">
                <motion.h1
                    className="text-5xl md:text-7xl font-playfair mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Sarah & Michael
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl font-playfair mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Are getting married!
                </motion.p>
                <motion.div
                    className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <p className="text-lg font-roboto">
                        Dear <span className="font-bold text-pink-300">{guestName} Family</span>,
                    </p>
                    <p className="mt-2 text-sm font-light">
                        You and up to {maxAttendees} guests are invited to celebrate with us.
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span className="text-sm uppercase tracking-widest">Scroll Down</span>
            </motion.div>
        </section>
    )
}

export default Hero
