import React, { useState, useEffect } from "react";
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
/* ── Staggered Word Helper ── */
function StaggeredWordText({ text, style, delay = 0 }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <span style={{ display: "inline-block", ...style }}>
      {words.map((word, index) => (
        <span key={index} style={{ display: "inline-block", marginRight: "0.25em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.1, // Slower word stagger
              ease: [0.2, 0.65, 0.3, 0.9],
            }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── March 2026 calendar data ── */
const DAYS_IN_MARCH = 31;
const START_DAY = 0; // March 1, 2026 = Sunday
const WEDDING_DAY = 28;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const calendarCells = (() => {
  const cells = [];
  for (let i = 0; i < START_DAY; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MARCH; d++) cells.push(d);
  return cells;
})();

/* ── Countdown helper ── */
function getTimeLeft(target) {
  const diff = target - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

/* ── CountdownUnit ── */
function CountdownUnit({ value, label, showDivider }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "40px" }}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.7rem", // Scaled down for elegance
            color: "#4A3728",
            lineHeight: 1,
            marginBottom: "4px",
          }}>
          {String(value).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C4A44E",
            fontFamily: "'Roboto', sans-serif",
          }}>
          {label}
        </span>
      </div>
      {showDivider && (
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem", // Scaled down divider
            color: "rgba(196,164,78,0.3)",
            margin: "0 6px",
            fontWeight: 300,
          }}>
          :
        </span>
      )}
    </div>
  );
}

/* ── Decorative separator ── */
function ThinLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
      <div style={{ width: 6, height: 6, transform: "rotate(45deg)", backgroundColor: "rgba(196,164,78,0.5)" }} />
      <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Section 1: WHEN — Calendar + Date
   ═══════════════════════════════════════════════════ */
export function DetailWhen() {
  const { t } = useLanguage();
  const weddingDate = new Date("2026-03-28T16:00:00");
  const countdown = useCountdown(weddingDate);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF6F3",
        textAlign: "center",
        padding: "0 16px",
      }}>
      <motion.div
        style={{ width: "100%", maxWidth: 380, margin: "0 auto" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}>
        {/* Header (Staggered Animation) */}
        <div style={{ marginBottom: 4 }}>
          <StaggeredText
            text={t("when")}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "#4A3728",
            }}
          />
        </div>

        <motion.p
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C4A44E",
            fontFamily: "'Roboto', sans-serif",
            marginBottom: 20,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          {t("march")}
        </motion.p>

        <ThinLine />

        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
            {WEEKDAYS.map((day, i) => (
              <div
                key={"wk" + i}
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#7A6455",
                  fontFamily: "'Roboto', sans-serif",
                  padding: "4px 0",
                }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 4 }}>
            {calendarCells.map((day, i) => {
              const isWedding = day === WEDDING_DAY;
              return (
                <motion.div
                  key={"d" + i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 0",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.015 }} // Staggered pop-in for each calendar day
                >
                  {day !== null && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.85rem",
                        ...(isWedding ? { backgroundColor: "#C4A44E", color: "#fff", fontWeight: 700, boxShadow: "0 4px 12px rgba(196,164,78,0.35)", transform: "scale(1.15)" } : { color: "#4A3728" }),
                      }}>
                      {day}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <ThinLine />

        {/* Ceremony Info */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728", fontSize: "1rem", marginBottom: 6 }}>{t("theCeremony")}</p>
          <p style={{ fontFamily: "'Roboto', sans-serif", color: "#7A6455", fontSize: "0.85rem" }}>{t("ceremonyTime")}</p>
        </motion.div>

        <ThinLine />

        {/* Countdown */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 0 }}>
            <CountdownUnit value={countdown.days} label={t("days")} showDivider={true} />
            <CountdownUnit value={countdown.hours} label={t("hours")} showDivider={true} />
            <CountdownUnit value={countdown.minutes} label={t("minutes")} showDivider={true} />
            <CountdownUnit value={countdown.seconds} label={t("seconds")} showDivider={false} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   Section 2: WHERE — Venue
   ═══════════════════════════════════════════════════ */
export function DetailWhere() {
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
        padding: "0 16px",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Background flourish subtle */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          opacity: 0.05,
          transform: "scale(2)",
          pointerEvents: "none",
        }}>
        <svg width="200" height="200" viewBox="0 0 100 100">
          <path d="M50 0 C40 40 10 40 0 50 C10 60 40 60 50 100 C60 60 90 60 100 50 C90 40 60 40 50 0 Z" fill="#C4A44E" />
        </svg>
      </div>

      <motion.div
        style={{ width: "100%", maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 10, padding: "20px 0" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0, ease: "easeOut" }}>
        <p
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "#C4A44E",
            fontFamily: "'Roboto', sans-serif",
            marginBottom: 16,
          }}>
          {t("where")}
        </p>
        <div style={{ marginBottom: 24, lineHeight: 1 }}>
          <StaggeredText
            text={t("venueName")}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              color: "#4A3728",
              textShadow: "1px 1px 3px rgba(196,164,78,0.2)",
            }}
            delay={0.2}
          />
        </div>

        <ThinLine />

        {/* The Royal Map Card */}
        <div
          style={{
            position: "relative",
            padding: "70px 40px 50px",
            borderRadius: "200px 200px 16px 16px", // Grand Arch
            backgroundColor: "#FFFFFF",
            boxShadow: "0 30px 60px rgba(74, 55, 40, 0.08), inset 0 0 0 1px rgba(255,255,255,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
            border: "1px solid rgba(196,164,78,0.3)",
            background: "linear-gradient(to bottom, #FFFFFF 0%, #FAF8F5 100%)",
          }}>
          {/* Inner Arch Line 1 */}
          <div
            style={{
              position: "absolute",
              inset: "10px",
              border: "1px solid rgba(196,164,78,0.4)",
              pointerEvents: "none",
              borderRadius: "190px 190px 8px 8px",
            }}
          />
          {/* Inner Arch Line 2 (delicate) */}
          <div
            style={{
              position: "absolute",
              inset: "16px",
              border: "0.5px solid rgba(196,164,78,0.2)",
              pointerEvents: "none",
              borderRadius: "184px 184px 4px 4px",
            }}
          />

          {/* Majestic Crest / Motif */}
          <div style={{ marginBottom: 28, color: "#C4A44E" }}>
            <svg width="64" height="64" viewBox="0 0 120 120" fill="none">
              {/* Elegant 5-Petal Floral Motif for Circles */}
              <g transform="translate(60, 60) scale(1.15)">
                {/* Thin inner circle */}
                <circle cx="0" cy="0" r="18" fill="none" stroke="#C4A44E" strokeWidth="0.5" />

                {/* 5 graceful overlapping petals */}
                <path d="M0 -22 C6 -12 14 -10 4 -4 C12 -6 20 0 10 6 C15 12 10 20 2 12 C-6 20 -11 12 -6 6 C-18 0 -10 -6 -2 -4 C-12 -10 -4 -12 0 -22 Z" fill="rgba(196,164,78,0.15)" stroke="#C4A44E" strokeWidth="0.75" strokeLinejoin="round" />
                <path d="M0 -15 C4 -8 10 -6 3 -2 C8 -3 14 0 7 3 C10 8 7 14 1 8 C-4 14 -7 8 -4 3 C-12 0 -7 -3 -1 -2 C-8 -6 -3 -8 0 -15 Z" fill="#C4A44E" opacity="0.6" />

                {/* Center pearl */}
                <circle cx="0" cy="0" r="2.5" fill="#fff" stroke="#C4A44E" strokeWidth="1" />
              </g>
              <circle cx="60" cy="60" r="45" stroke="#C4A44E" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="60" cy="10" r="3" fill="#C4A44E" />
              <circle cx="60" cy="110" r="3" fill="#C4A44E" />
              <circle cx="10" cy="60" r="3" fill="#C4A44E" />
              <circle cx="110" cy="60" r="3" fill="#C4A44E" />
            </svg>
          </div>

          {/* Address Block */}
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#4A3728",
              fontSize: "1.4rem",
              textTransform: "uppercase",
              marginBottom: 12,
              letterSpacing: "0.1em",
              fontWeight: 500,
            }}>
            {t("venueAddress1")}
          </p>
          <div style={{ width: "30px", height: "1px", backgroundColor: "#C4A44E", marginBottom: 12, opacity: 0.5 }} />
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              color: "#8A7664",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 40,
            }}>
            {t("venueAddress2")}
          </p>

          {/* Interactive Map - Framed like a painting */}
          <div
            style={{
              width: "100%",
              height: "300px",
              marginBottom: 40,
              position: "relative",
              padding: "8px",
              background: "linear-gradient(135deg, rgba(196,164,78,0.05), rgba(196,164,78,0.25), rgba(196,164,78,0.05))",
              borderRadius: "8px",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 10px 30px rgba(74, 55, 40, 0.05)",
            }}>
            {/* Map wrapper with inner rounded corners to match the border */}
            <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: "4px", backgroundColor: "#FAF8F5", border: "1px solid rgba(255,255,255,0.8)" }}>
              <iframe
                width="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-89.139261%2C17.075971%2C-89.119261%2C17.095971&layer=mapnik&marker=17.085971%2C-89.129261"
                style={{
                  filter: "sepia(25%) hue-rotate(-15deg) saturate(85%) contrast(1.1)",
                  height: "calc(100% + 50px)", // crop bottom area
                  border: "none",
                }}></iframe>
            </div>
          </div>

          {/* Luxurious Directions Button */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=17.085971,-89.129261"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden transition-all duration-500 hover:shadow-[0_15px_30px_rgba(196,164,78,0.3)] hover:-translate-y-1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "18px 48px",
              background: "linear-gradient(135deg, #B08D57, #EAC875, #B08D57)",
              backgroundSize: "200% auto",
              color: "#FFFFFF",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
              fontFamily: "'Roboto', sans-serif",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(196,164,78,0.2), inset 0 1px 1px rgba(255,255,255,0.4)",
              fontWeight: 600,
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = "right center";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = "left center";
            }}>
            <span>{t("getDirections")}</span>
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   Section 3: PEOPLE INVOLVED
   ═══════════════════════════════════════════════════ */
export function DetailPeople() {
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
        style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}>
        {/* Elegant Hand-drawn Tulip Line Art */}
        <div style={{ marginBottom: 8, marginTop: "-40px", display: "flex", justifyContent: "center" }}>
          <svg width="120" height="70" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft blush watercolor offset blobs */}
            <path d="M42 22 Q 50 5 70 15 Q 85 25 78 35 Q 70 45 55 42 Q 40 40 42 22 Z" fill="#ECA6A6" opacity="0.6" />
            <path d="M20 48 Q 25 35 40 38 Q 48 40 45 55 Q 40 70 28 65 Q 15 60 20 48 Z" fill="#ECA6A6" opacity="0.6" />
            <path d="M55 48 Q 65 35 78 40 Q 85 45 80 55 Q 75 65 60 58 Q 50 55 55 48 Z" fill="#ECA6A6" opacity="0.6" />

            {/* Top Flower Cup */}
            <path d="M46 22 Q 40 35 58 42" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M78 20 Q 82 35 58 42" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M46 22 Q 52 18 58 24 Q 65 20 78 20" stroke="#1A1A1A" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
            <path d="M52 20 C 52 30 55 35 58 42" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M72 19 C 72 30 65 35 58 42" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />

            {/* Main Stems */}
            <path d="M58 42 Q 62 80 55 110" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M40 60 Q 55 80 60 90" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />

            {/* Bottom Left Flower Cup */}
            <path d="M22 55 Q 28 68 40 60" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M46 45 Q 52 55 40 60" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M22 55 Q 30 50 35 55 Q 40 48 46 45" stroke="#1A1A1A" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
            <path d="M30 53 C 32 58 35 60 40 60" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M40 48 C 38 52 38 55 40 60" stroke="#1A1A1A" strokeWidth="0.9" strokeLinecap="round" fill="none" />

            {/* Leaves */}
            <path d="M60 48 C 75 35 85 45 85 45 C 85 55 70 60 60 48 Z" stroke="#1A1A1A" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
            <path d="M60 48 Q 72 45 82 45" stroke="#1A1A1A" strokeWidth="0.9" fill="none" />

            <path d="M60 55 C 50 42 42 45 42 50 C 42 58 50 62 60 55 Z" stroke="#1A1A1A" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
            <path d="M60 55 Q 55 50 45 48" stroke="#1A1A1A" strokeWidth="0.9" fill="none" />

            <path d="M58 85 C 40 75 30 80 30 85 C 30 95 45 95 58 85 Z" stroke="#1A1A1A" strokeWidth="0.9" strokeLinejoin="round" fill="none" />
            <path d="M58 85 Q 45 85 35 85" stroke="#1A1A1A" strokeWidth="0.9" fill="none" />
          </svg>
        </div>

        <div style={{ marginBottom: 48, lineHeight: 1.6 }}>
          <StaggeredText
            text={t("blessingOfParents")}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.15rem, 3vw, 1.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#4A3728",
              fontWeight: 400,
            }}
          />
        </div>

        {/* Bride's Parents */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(2rem, 6vw, 2.5rem)",
              color: "#7A6455",
              marginBottom: 16,
            }}>
            {t("bride")}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase", fontWeight: 300 }}>
            Jorge Kotch
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>
            Marleni Kotch
          </motion.p>
        </motion.div>

        {/* Groom's Parents */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(2rem, 6vw, 2.5rem)",
              color: "#7A6455",
              marginBottom: 16,
            }}>
            {t("groom")}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase", fontWeight: 300 }}>
            Luis Coc
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>
            Celia Coc
          </motion.p>
        </motion.div>

        <ThinLine />

        {/* Godparents */}
        <div style={{ marginTop: 40 }}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            {t("accompaniedByGodparents")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase", fontWeight: 300 }}>
            Jenny Panti
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ fontFamily: "'Roboto', sans-serif", color: "#4A3728", fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>
            Gary Panti
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   Section 4: BIBLE VERSES
   ═══════════════════════════════════════════════════ */
export function VerseSection({ text, reference }) {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF6F3",
        textAlign: "center",
        padding: "80px 24px",
        minHeight: "50vh",
      }}>
      <motion.div
        style={{ width: "100%", maxWidth: 640, margin: "0 auto", position: "relative" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease: "easeOut" }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center", opacity: 0.6 }}>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#C4A44E" strokeWidth="1" strokeLinecap="round">
            <path d="M0 10 L15 10 M25 10 L40 10 M20 5 L20 15" strokeDasharray="2 4" />
            <circle cx="20" cy="10" r="3" fill="none" />
          </svg>
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "#4A3728",
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: 24,
            letterSpacing: "0.02em",
          }}>
          "<StaggeredWordText text={text} delay={0.2} />"
        </div>

        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#C4A44E",
            fontWeight: 500,
          }}>
          {reference}
        </p>
      </motion.div>
    </section>
  );
}

export default function WeddingInfo() {
  return (
    <>
      <DetailWhen />
      <DetailWhere />
      <DetailPeople />
    </>
  );
}
