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

/* ── Decorative separator (matching DetailPeople) ── */
function ThinLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
      <div style={{ width: 6, height: 6, transform: "rotate(45deg)", backgroundColor: "rgba(196,164,78,0.5)" }} />
      <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
    </div>
  );
}

const Gifts = () => {
  const { t } = useLanguage();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF6F3",
        textAlign: "center",
        padding: "0px 16px",
      }}>
      <motion.div
        style={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: "60px 0" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}>
        {/* Elegant Hand-drawn Ribbon/Gift Art (Minimalist) */}
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft blush watercolor offset blob */}
            <path d="M50 20 Q 70 20 80 40 Q 90 60 70 80 Q 50 100 30 80 Q 10 60 30 40 Q 40 20 50 20 Z" fill="#ECA6A6" opacity="0.3" />

            {/* Minimalist ribbon loops */}
            <path d="M50 50 C 70 30 80 60 50 50" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M50 50 C 30 30 20 60 50 50" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Ribbon tails */}
            <path d="M50 50 Q 60 70 70 85" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M50 50 Q 40 70 30 85" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* Center knot */}
            <circle cx="50" cy="50" r="3" stroke="#1A1A1A" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div style={{ marginBottom: 32, lineHeight: 1.6 }}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#4A3728",
              fontWeight: 400,
            }}>
            {t("giftsTitle")}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#7A6455",
            marginBottom: 48,
            lineHeight: 1.8,
            fontStyle: "italic",
            padding: "0 20px",
          }}>
          {t("giftsMessage")}
        </motion.p>

        {/* Gift Options (Mesa & Sobre) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.8 }} style={{ lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(2rem, 6vw, 2.5rem)",
                color: "#7A6455",
              }}>
              {t("giftTable")}
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 1.1 }} style={{ lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(2rem, 6vw, 2.5rem)",
                color: "#7A6455",
              }}>
              {t("inEnvelope")}
            </span>
          </motion.div>
        </div>

        <ThinLine />

        {/* Bank Details */}
        <div style={{ marginTop: 40 }}>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#4A3728",
              marginBottom: 24,
              lineHeight: 1.6,
              fontWeight: 400,
            }}>
            {t("bankDetails")}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.5 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase", fontWeight: 300 }}>
            {t("bankName")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.8 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", marginBottom: 8, fontWeight: 300 }}>
            {t("accountNumber")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 1.1 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>
            {t("bankInstitution")}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default Gifts;
