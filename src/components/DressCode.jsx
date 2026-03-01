import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

/* ── Staggered Text Helper ── */
function StaggeredText({ text, style, delay = 0 }) {
  if (!text) return null;
  const letters = text.split("");

  return (
    <span style={{ display: "inline-block", ...style }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.04,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Minimalist Classic Divider ── */
function MinimalDivider({ color = "#C4A44E" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "30px 0" }}>
      <div style={{ height: 1, width: 60, backgroundColor: color, opacity: 0.3 }} />
      <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: color, opacity: 0.8 }} />
      <div style={{ height: 1, width: 60, backgroundColor: color, opacity: 0.3 }} />
    </div>
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
      }}>
      <motion.div
        style={{
          width: "100%",
          maxWidth: 540,
          margin: "0 auto",
          position: "relative",
          padding: "60px 40px",
          border: "1px solid rgba(196,164,78,0.2)",
          borderRadius: "4px", // Sharp, classic frame
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 40px rgba(74, 55, 40, 0.04)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease: "easeOut" }}>
        {/* Outline accent frame */}
        <div
          style={{
            position: "absolute",
            inset: "8px",
            border: "0.5px solid rgba(196,164,78,0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Elegant Hanger Icon representing attire */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center", color: "#C4A44E" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2ZM12 6V8M12 8L4 13.5V16L8 16L12 12.5M12 8L20 13.5V16L16 16L12 12.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div style={{ marginBottom: 16, lineHeight: 1.2 }}>
          <StaggeredText
            text={t("dressCodeTitle")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              color: "#4A3728",
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C4A44E",
            marginBottom: 8,
            fontWeight: 500,
          }}>
          {t("dressCodeStyle")}
        </p>

        <MinimalDivider />

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
            color: "#7A6455",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}>
          {t("dressCodeMessage")}
        </p>

        {/* Color swatches indicating reserved colors */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }} />
            <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8A7664" }}>{t("colorWhite")}</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "#C4A44E", fontSize: "1.2rem", fontStyle: "italic", opacity: 0.6 }}>&amp;</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#1A1A1A", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }} />
            <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8A7664" }}>{t("colorBlack")}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DressCode;
