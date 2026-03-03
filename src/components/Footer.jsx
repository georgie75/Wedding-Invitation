import React from 'react'
import { motion } from 'framer-motion'
import coupleImg from '../assets/coupleImg.jpeg' // Couple image background

const Footer = () => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Smooth gradient blend from previous section */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FBF6F3] to-transparent z-10" />

            {/* Background Image with elegant overlay */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${coupleImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: "center 20%",
                }}
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
            />
            {/* Custom overlay matching wedding-cream with 85% opacity */}
            <div className="absolute inset-0 z-0 bg-[#FBF6F3]/85" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Decorative rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8"
                >
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                        <ellipse cx="22" cy="20" rx="14" ry="14" stroke="#C4A44E" strokeWidth="1.2" fill="none" opacity="0.5" />
                        <ellipse cx="38" cy="20" rx="14" ry="14" stroke="#C4A44E" strokeWidth="1.2" fill="none" opacity="0.5" />
                    </svg>
                </motion.div>

                <motion.div
                    className="flex items-center justify-center gap-2 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <span
                        style={{ fontFamily: "'Pinyon Script', cursive", color: "#8C6A36" }}
                        className="text-5xl md:text-6xl"
                    >
                        Alexus
                    </span>
                    <span
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#B08D57" }}
                        className="text-2xl mt-2"
                    >
                        &amp;
                    </span>
                    <span
                        style={{ fontFamily: "'Pinyon Script', cursive", color: "#8C6A36" }}
                        className="text-5xl md:text-6xl"
                    >
                        Luis
                    </span>
                </motion.div>

                <motion.p
                    className="text-sm text-wedding-gold tracking-[0.3em] uppercase font-roboto mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    28 · 03 · 2026
                </motion.p>

                <motion.div
                    className="h-px w-24 bg-wedding-tan/50"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                />
            </motion.div>
        </section>
    )
}

export default Footer
