import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* ── Inline SVG: Elegant Ornate Wedding Rings ── */
const WeddingRingsIcon = ({ color = "#B08D57", size = 130 }) => (
    <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 140 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Left ring - outer */}
        <ellipse cx="48" cy="72" rx="26" ry="28" stroke={color} strokeWidth="1.8" fill="none" />
        {/* Left ring - inner detail */}
        <ellipse cx="48" cy="72" rx="22" ry="24" stroke={color} strokeWidth="0.6" fill="none" opacity="0.4" />
        {/* Right ring - outer */}
        <ellipse cx="92" cy="72" rx="26" ry="28" stroke={color} strokeWidth="1.8" fill="none" />
        {/* Right ring - inner detail */}
        <ellipse cx="92" cy="72" rx="22" ry="24" stroke={color} strokeWidth="0.6" fill="none" opacity="0.4" />
        {/* Diamond - multi-facet */}
        <polygon points="48,26 40,42 48,37 56,42" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        <line x1="48" y1="26" x2="48" y2="37" stroke={color} strokeWidth="0.7" opacity="0.5" />
        <line x1="40" y1="42" x2="48" y2="37" stroke={color} strokeWidth="0.7" opacity="0.5" />
        <line x1="56" y1="42" x2="48" y2="37" stroke={color} strokeWidth="0.7" opacity="0.5" />
        {/* Diamond crown line */}
        <line x1="42" y1="34" x2="54" y2="34" stroke={color} strokeWidth="0.8" opacity="0.4" />
        {/* Sparkle rays */}
        <line x1="48" y1="16" x2="48" y2="22" stroke={color} strokeWidth="1" opacity="0.7" />
        <line x1="38" y1="19" x2="41" y2="24" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="58" y1="19" x2="55" y2="24" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="34" y1="24" x2="38" y2="27" stroke={color} strokeWidth="0.6" opacity="0.35" />
        <line x1="62" y1="24" x2="58" y2="27" stroke={color} strokeWidth="0.6" opacity="0.35" />
    </svg>
)

/* ── Decorative flourish line ── */
const Flourish = ({ color = "#B08D57" }) => (
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.5"
        />
    </svg>
)

const Hero = ({ guestName, maxAttendees }) => {
    const { t, lang, toggleLanguage } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-wedding-cream">

            {/* Language Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1.5 rounded-full border border-wedding-tan/30 bg-wedding-champagne/40 text-wedding-gold font-roboto text-sm uppercase tracking-widest hover:bg-wedding-champagne transition-colors"
                >
                    {lang === 'en' ? 'ES' : 'EN'}
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl">
                {/* Wedding Rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <WeddingRingsIcon color="#B08D57" size={140} />
                </motion.div>

                {/* Names: "Alexus & Luis" in Sloop Script */}
                <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                >
                    <h1
                        className="leading-[0.9]"
                        style={{
                            fontFamily: "'Pinyon Script', cursive",
                            fontSize: "clamp(5rem, 14vw, 9rem)",
                            letterSpacing: "0.02em",
                            color: "#B08D57",
                        }}
                    >
                        Alexus
                        <span
                            className="inline-block mx-3"
                            style={{
                                fontFamily: "'Pinyon Script', cursive",
                                fontSize: "0.7em",
                                color: "#8B6914",
                            }}
                        >
                            &amp;
                        </span>
                        Luis
                    </h1>
                </motion.div>

                {/* Decorative flourish */}
                <motion.div
                    className="my-6"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <Flourish color="#7A1E3A" />
                </motion.div>

                {/* Date */}
                <motion.p
                    className="tracking-[0.4em] uppercase"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(0.85rem, 2.5vw, 1.15rem)",
                        fontWeight: 400,
                        color: "#B08D57",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.0 }}
                >
                    28 &middot; 03 &middot; 2026
                </motion.p>

                {/* Tagline */}
                <motion.p
                    className="mt-8 text-wedding-text-light italic"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(0.8rem, 2vw, 1rem)",
                        letterSpacing: "0.1em",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.4 }}
                >
                    {t('togetherWithFamilies')}
                </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <span
                    className="tracking-[0.2em] uppercase"
                    style={{ fontSize: "0.65rem", color: "rgba(176, 141, 87, 0.5)" }}
                >
                    Scroll Down
                </span>
            </motion.div>
        </section>
    )
}

export default Hero


