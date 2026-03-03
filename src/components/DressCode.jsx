import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

/* ── Royal Ornament SVG ── */
function RoyalOrnament() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Delicate swoops */}
      <path d="M60 5 C 75 5 85 20 105 20" stroke="#C4A44E" strokeWidth="0.75" fill="none" />
      <path d="M60 5 C 45 5 35 20 15 20" stroke="#C4A44E" strokeWidth="0.75" fill="none" />

      {/* Central Floral Emblem */}
      <path d="M60 2 C 65 10 75 12 75 18 C 65 18 64 25 60 34 C 56 25 55 18 45 18 C 45 12 55 10 60 2 Z" fill="rgba(196,164,78,0.15)" stroke="#C4A44E" strokeWidth="1" strokeLinejoin="round" />
      <path d="M60 8 C 63 13 68 15 68 18 C 63 18 62 22 60 28 C 58 22 57 18 52 18 C 52 15 57 13 60 8 Z" fill="#C4A44E" opacity="0.5" />

      {/* Delicate Flower Left */}
      <g transform="translate(15, 20) scale(0.6)">
        <path d="M0,0 C-5,-5 -10,0 0,10 C10,0 5,-5 0,0 Z" fill="#C4A44E" opacity="0.8" />
        <path d="M0,0 C5,-5 10,0 0,10 C-10,0 -5,-5 0,0 Z" fill="#C4A44E" opacity="0.8" transform="rotate(90)" />
        <circle cx="0" cy="5" r="2" fill="#fff" />
      </g>

      {/* Delicate Flower Right */}
      <g transform="translate(105, 20) scale(0.6)">
        <path d="M0,0 C-5,-5 -10,0 0,10 C10,0 5,-5 0,0 Z" fill="#C4A44E" opacity="0.8" />
        <path d="M0,0 C5,-5 10,0 0,10 C-10,0 -5,-5 0,0 Z" fill="#C4A44E" opacity="0.8" transform="rotate(90)" />
        <circle cx="0" cy="5" r="2" fill="#fff" />
      </g>

      {/* Tiny bud left */}
      <circle cx="28" cy="20" r="1.5" fill="#C4A44E" opacity="0.6" />
      {/* Tiny bud right */}
      <circle cx="92" cy="20" r="1.5" fill="#C4A44E" opacity="0.6" />
    </svg>
  );
}

const DressCode = () => {
  const { t } = useLanguage();

  return (
    <section
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF6F3",
        textAlign: "center",
        padding: "80px 16px",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          maxWidth: 640,
          margin: "0 auto",
          position: "relative",
          padding: "60px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        {/* Elegant Corner Brackets */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "30px", height: "30px", borderTop: "2px solid rgba(196,164,78,0.7)", borderLeft: "2px solid rgba(196,164,78,0.7)" }} />
        <div style={{ position: "absolute", top: 4, left: 4, width: "15px", height: "15px", borderTop: "1px solid rgba(196,164,78,0.4)", borderLeft: "1px solid rgba(196,164,78,0.4)" }} />

        <div style={{ position: "absolute", top: 0, right: 0, width: "30px", height: "30px", borderTop: "2px solid rgba(196,164,78,0.7)", borderRight: "2px solid rgba(196,164,78,0.7)" }} />
        <div style={{ position: "absolute", top: 4, right: 4, width: "15px", height: "15px", borderTop: "1px solid rgba(196,164,78,0.4)", borderRight: "1px solid rgba(196,164,78,0.4)" }} />

        <div style={{ position: "absolute", bottom: 0, left: 0, width: "30px", height: "30px", borderBottom: "2px solid rgba(196,164,78,0.7)", borderLeft: "2px solid rgba(196,164,78,0.7)" }} />
        <div style={{ position: "absolute", bottom: 4, left: 4, width: "15px", height: "15px", borderBottom: "1px solid rgba(196,164,78,0.4)", borderLeft: "1px solid rgba(196,164,78,0.4)" }} />

        <div style={{ position: "absolute", bottom: 0, right: 0, width: "30px", height: "30px", borderBottom: "2px solid rgba(196,164,78,0.7)", borderRight: "2px solid rgba(196,164,78,0.7)" }} />
        <div style={{ position: "absolute", bottom: 4, right: 4, width: "15px", height: "15px", borderBottom: "1px solid rgba(196,164,78,0.4)", borderRight: "1px solid rgba(196,164,78,0.4)" }} />

        {/* Top Ornament */}
        <div style={{ marginBottom: "24px" }}>
          <RoyalOrnament />
        </div>

        {/* Title */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#4A3728",
            margin: 0,
            lineHeight: 1,
            fontWeight: 400
          }}>
            {t("dressCodeTitle")}
          </h2>
        </div>

        {/* Subtitle / Style */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "#8A7664",
          marginBottom: "32px",
          fontWeight: 400
        }}>
          {t("dressCodeStyle")}
        </p>

        {/* Message */}
        <div style={{ position: "relative", padding: "0 20px" }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
            color: "#4A3728",
            lineHeight: 1.8,
            fontStyle: "italic",
            maxWidth: "500px",
            margin: "0 auto",
          }}>
            {t("dressCodeMessage")}
          </p>
        </div>

        {/* Diamond Color Badge replacing the basic circle */}
        <div style={{ marginTop: "44px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: "56px",
            height: "56px",
            transform: "rotate(45deg)",
            border: "1px solid #C4A44E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(196,164,78,0.2)",
            backgroundColor: "#FBF6F3"
          }}>
            {/* Inner diamond for the color white */}
            <div style={{
              width: "42px",
              height: "42px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
            }} />
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C4A44E",
            fontWeight: 500
          }}>
            {t("colorWhite")}
          </p>
        </div>

        {/* Bottom Ornament */}
        <div style={{ marginTop: "40px", transform: "rotate(180deg)" }}>
          <RoyalOrnament />
        </div>
      </motion.div>
    </section>
  );
};

export default DressCode;
