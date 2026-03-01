import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

/* ── Inline SVG: Elegant Ornate Wedding Rings ── */
const WeddingRingsIcon = ({ color = "#B08D57", size = 110 }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 140 118" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left ring - outer */}
    <ellipse cx="48" cy="72" rx="26" ry="28" stroke={color} strokeWidth="1.5" fill="none" />
    {/* Left ring - inner detail */}
    <ellipse cx="48" cy="72" rx="22" ry="24" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6" />
    {/* Right ring - outer */}
    <ellipse cx="92" cy="72" rx="26" ry="28" stroke={color} strokeWidth="1.5" fill="none" />
    {/* Right ring - inner detail */}
    <ellipse cx="92" cy="72" rx="22" ry="24" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6" />
    {/* Diamond - multi-facet */}
    <polygon points="48,26 40,42 48,37 56,42" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    <line x1="48" y1="26" x2="48" y2="37" stroke={color} strokeWidth="0.5" opacity="0.5" />
    <line x1="40" y1="42" x2="48" y2="37" stroke={color} strokeWidth="0.5" opacity="0.5" />
    <line x1="56" y1="42" x2="48" y2="37" stroke={color} strokeWidth="0.5" opacity="0.5" />
    {/* Diamond crown line */}
    <line x1="42" y1="34" x2="54" y2="34" stroke={color} strokeWidth="0.6" opacity="0.4" />
    {/* Sparkle rays */}
    <line x1="48" y1="16" x2="48" y2="22" stroke={color} strokeWidth="1" opacity="0.7" />
    <line x1="38" y1="19" x2="41" y2="24" stroke={color} strokeWidth="0.8" opacity="0.5" />
    <line x1="58" y1="19" x2="55" y2="24" stroke={color} strokeWidth="0.8" opacity="0.5" />
    <line x1="34" y1="24" x2="38" y2="27" stroke={color} strokeWidth="0.6" opacity="0.35" />
    <line x1="62" y1="24" x2="58" y2="27" stroke={color} strokeWidth="0.6" opacity="0.35" />
  </svg>
);

/* ── Delicate Royal Flourish ── */
const DelicateFlourish = ({ color = "#B08D57" }) => (
  <svg width="150" height="15" viewBox="0 0 150 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 7.5 L65 7.5" stroke={color} strokeWidth="0.8" opacity="0.6" />
    <path d="M85 7.5 L140 7.5" stroke={color} strokeWidth="0.8" opacity="0.6" />
    <rect x="71" y="3.5" width="8" height="8" transform="rotate(45 75 7.5)" stroke={color} strokeWidth="0.8" fill="none" opacity="0.8" />
    <circle cx="75" cy="7.5" r="1.5" fill={color} />
    <circle cx="10" cy="7.5" r="1.5" fill={color} opacity="0.5" />
    <circle cx="140" cy="7.5" r="1.5" fill={color} opacity="0.5" />
  </svg>
);

const Hero = ({ guestName, maxAttendees }) => {
  const { t, lang, toggleLanguage } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-wedding-cream pt-16 pb-24">
      {/* Elegant Royal Arch Frame */}
      <motion.div
        className="absolute inset-4 sm:inset-6 md:inset-8 border-[1px] border-wedding-gold/40 rounded-t-[150px] md:rounded-t-full pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}>
        <div className="absolute inset-2 sm:inset-3 border-[0.5px] border-wedding-gold/20 rounded-t-[140px] md:rounded-t-full"></div>
      </motion.div>

      {/* Language Toggle */}
      <div className="absolute top-10 right-10 z-50">
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-wedding-tan bg-wedding-cream/60 backdrop-blur-sm text-wedding-gold font-roboto text-xs uppercase tracking-widest hover:bg-wedding-tan/30 transition-colors shadow-sm">
          {lang === "en" ? "ES" : "EN"}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl w-full">
        {/* Pre-title */}
        <motion.p
          className="tracking-[0.35em] uppercase mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
            color: "#7A6455",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}>
          {lang === "en" ? "The Wedding Of" : "La Boda De"}
        </motion.p>

        {/* Names: "Alexus & Luis" arranged vertically for classical elegance */}
        <motion.div className="flex flex-col items-center justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}>
          <h1
            className="leading-[0.85] py-2"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(5rem, 15vw, 8.5rem)",
              color: "#8C6A36",
            }}>
            Alexus
          </h1>

          <span
            className="my-3 z-10 block"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#B08D57",
              fontStyle: "italic",
              opacity: 0.9,
            }}>
            &amp;
          </span>

          <h1
            className="leading-[0.85] py-2"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(5rem, 15vw, 8.5rem)",
              color: "#8C6A36",
            }}>
            Luis
          </h1>
        </motion.div>

        {/* Delicate flourish */}
        <motion.div className="mt-10 mb-6" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1.2, delay: 1.0 }}>
          <DelicateFlourish color="#B08D57" />
        </motion.div>

        {/* Rings integrated below the names */}
        <motion.div className="mb-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 1.3 }}>
          <WeddingRingsIcon color="#B08D57" size={60} />
        </motion.div>

        {/* Date */}
        <motion.p
          className="tracking-[0.4em] uppercase"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
            fontWeight: 400,
            color: "#B08D57",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}>
          28 &middot; 03 &middot; 2026
        </motion.p>
      </div>

      {/* Scroll indicator - Elegant soft glowing line */}
      <motion.div className="absolute bottom-12 flex flex-col items-center z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1.5 }}>
        <span
          className="tracking-[0.3em] uppercase mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.55rem",
            color: "#8C6A36",
            opacity: 0.8,
          }}>
          {lang === "en" ? "Scroll" : "Deslizar"}
        </span>
        <motion.div
          className="w-[1px] h-12 bg-wedding-gold/60 origin-top"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Gradient fade layer: seamlessly blends the section bottom with a white transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
