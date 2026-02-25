import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ── March 2026 calendar data ── */
const DAYS_IN_MARCH = 31
const START_DAY = 0 // March 1, 2026 = Sunday
const WEDDING_DAY = 28
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const calendarCells = (() => {
    const cells = []
    for (let i = 0; i < START_DAY; i++) cells.push(null)
    for (let d = 1; d <= DAYS_IN_MARCH; d++) cells.push(d)
    return cells
})()

/* ── Countdown helper ── */
function getTimeLeft(target) {
    const diff = target - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}

function useCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))
    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
        return () => clearInterval(id)
    }, [targetDate])
    return timeLeft
}

/* ── CountdownUnit ── */
function CountdownUnit({ value, label }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
                style={{
                    width: 52, height: 52,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8,
                    border: "1px solid rgba(235,223,208,0.4)",
                    backgroundColor: "rgba(247,231,206,0.35)",
                }}
            >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#4A3728" }}>
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span style={{
                marginTop: 6, fontSize: "0.55rem", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "#7A6455", fontFamily: "'Roboto', sans-serif",
            }}>
                {label}
            </span>
        </div>
    )
}

/* ── Decorative separator ── */
function ThinLine() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
            <div style={{ width: 6, height: 6, transform: "rotate(45deg)", backgroundColor: "rgba(196,164,78,0.5)" }} />
            <div style={{ height: 1, width: 48, backgroundColor: "rgba(196,164,78,0.3)" }} />
        </div>
    )
}

/* ═══════════════════════════════════════════════════
   Section 1: WHEN — Calendar + Date
   ═══════════════════════════════════════════════════ */
export function DetailWhen() {
    const weddingDate = new Date('2026-03-28T16:00:00')
    const countdown = useCountdown(weddingDate)

    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#FBF6F3", textAlign: "center", padding: "0 16px",
        }}>
            <motion.div
                style={{ width: "100%", maxWidth: 380, margin: "0 auto" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <motion.h2
                    style={{
                        fontFamily: "'Pinyon Script', cursive",
                        fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                        color: "#4A3728", marginBottom: 4,
                    }}
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Our Big Day
                </motion.h2>

                <motion.p
                    style={{
                        fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.25em",
                        color: "#C4A44E", fontFamily: "'Roboto', sans-serif", marginBottom: 20,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    March 2026
                </motion.p>

                <ThinLine />

                {/* Calendar Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
                        {WEEKDAYS.map((day, i) => (
                            <div key={"wk" + i} style={{
                                fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em",
                                color: "#7A6455", fontFamily: "'Roboto', sans-serif", padding: "4px 0",
                            }}>
                                {day}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 4 }}>
                        {calendarCells.map((day, i) => {
                            const isWedding = day === WEDDING_DAY
                            return (
                                <div key={"d" + i} style={{
                                    display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0",
                                }}>
                                    {day !== null && (
                                        <div style={{
                                            width: 36, height: 36, display: "flex",
                                            alignItems: "center", justifyContent: "center",
                                            borderRadius: "50%",
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: "0.85rem",
                                            ...(isWedding
                                                ? { backgroundColor: "#C4A44E", color: "#fff", fontWeight: 700, boxShadow: "0 4px 12px rgba(196,164,78,0.35)", transform: "scale(1.15)" }
                                                : { color: "#4A3728" }
                                            ),
                                        }}>
                                            {day}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                <ThinLine />

                {/* Ceremony Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728", fontSize: "1rem", marginBottom: 6 }}>
                        The Ceremony · 28 March 2026
                    </p>
                    <p style={{ fontFamily: "'Roboto', sans-serif", color: "#7A6455", fontSize: "0.85rem" }}>
                        Ceremony to start at 4:00 PM
                    </p>
                </motion.div>

                <ThinLine />

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p style={{
                        fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em",
                        color: "#C4A44E", fontFamily: "'Roboto', sans-serif", marginBottom: 16,
                    }}>
                        Counting Down
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                        <CountdownUnit value={countdown.days} label="Days" />
                        <CountdownUnit value={countdown.hours} label="Hours" />
                        <CountdownUnit value={countdown.minutes} label="Min" />
                        <CountdownUnit value={countdown.seconds} label="Sec" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════
   Section 2: WHERE — Venue
   ═══════════════════════════════════════════════════ */
export function DetailWhere() {
    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#FBF6F3", textAlign: "center", padding: "0 16px",
        }}>
            <motion.div
                style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <p style={{
                    fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em",
                    color: "#C4A44E", fontFamily: "'Roboto', sans-serif", marginBottom: 8,
                }}>
                    Venue
                </p>
                <h2 style={{
                    fontFamily: "'Pinyon Script', cursive",
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: "#4A3728", marginBottom: 16,
                }}>
                    The Grand Garden Estate
                </h2>

                <ThinLine />

                <div style={{
                    padding: 32, borderRadius: 12,
                    border: "1px solid rgba(235,223,208,0.4)",
                    backgroundColor: "rgba(247,231,206,0.25)",
                }}>
                    <div style={{ fontSize: "2rem", marginBottom: 12 }}>📍</div>
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728", fontSize: "1.1rem", marginBottom: 8 }}>
                        123 Wedding Lane
                    </p>
                    <p style={{ fontFamily: "'Roboto', sans-serif", color: "#7A6455", fontSize: "0.85rem", lineHeight: 1.6 }}>
                        Cityville, State 12345
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════
   Section 3: RECEPTION — Countdown
   ═══════════════════════════════════════════════════ */
export function DetailReception() {
    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#FBF6F3", textAlign: "center", padding: "0 16px",
        }}>
            <motion.div
                style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <p style={{
                    fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em",
                    color: "#C4A44E", fontFamily: "'Roboto', sans-serif", marginBottom: 8,
                }}>
                    Celebration
                </p>
                <h2 style={{
                    fontFamily: "'Pinyon Script', cursive",
                    fontSize: "clamp(2rem, 6vw, 3rem)",
                    color: "#4A3728", marginBottom: 8,
                }}>
                    Reception to Follow
                </h2>

                <ThinLine />

                <div style={{
                    padding: 24, borderRadius: 12,
                    border: "1px solid rgba(235,223,208,0.4)",
                    backgroundColor: "rgba(247,231,206,0.25)",
                    marginBottom: 32,
                }}>
                    <div style={{ fontSize: "2rem", marginBottom: 12 }}>🥂</div>
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#4A3728", fontSize: "1rem", marginBottom: 4 }}>
                        Dinner & Dancing
                    </p>
                    <p style={{ fontFamily: "'Roboto', sans-serif", color: "#7A6455", fontSize: "0.85rem" }}>
                        to follow immediately after the ceremony
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

/* ── Default export (not currently used, but kept for compatibility) ── */
export default function WeddingInfo() {
    return (
        <>
            <DetailWhen />
            <DetailWhere />
            <DetailReception />
        </>
    )
}
