import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import backPaper from "../assets/backpaper2.png";
import topFlap from "../assets/topFlap.png";
import sealSVG from "../assets/envelope/waxseal2.svg";
import bgImage from "../assets/entrancebg2.png";
/* ── inline styles ─────────────────────────────────────── */
const styles = {
  stage: {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "calc(50% - 5px) bottom",

    backgroundColor: "#f5efe9",
    overflow: "hidden",
    cursor: "pointer",
    perspective: "1200px",
  },

  // Container for text + envelope + flowers
  container: {
    backgroundColor: "transparent",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 1000,
    marginTop: "-8vh", // Move the group up to balance the added text and space
  },

  headerText: {
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    fontWeight: 300,
    fontSize: "min(2.8vw, 13px)",
    color: "#4a3c31",
    marginBottom: "1rem",
    textAlign: "center",
    zIndex: 60,
  },

  namesText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "min(8vw, 68px)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 400,
    color: "#4a3c31",
    marginBottom: "1rem",
    textAlign: "center",
    zIndex: 60,
    lineHeight: 1,
  },

  andFamilyText: {
    fontFamily: "'Sloop Script', 'Great Vibes', cursive",
    fontSize: "min(7vw, 45px)", // Elegant size matching the cursive style
    color: "#5e4b35",
    marginTop: "0rem", // Removed negative margin to prevent overlapping the guest name
    textAlign: "center",
    zIndex: 60,
    lineHeight: 1,
  },

  // The envelope wrapper
  envelopeWrapper: {
    position: "relative",
    //  width: "min(70vw, 420px)",
    // height: "min(52.5vw, 315px)",
    width: "min(90vw, 500px)",
    height: "min(66vw, 315px)",
    transformStyle: "preserve-3d",
    zIndex: 50,
  },

  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },

  flap: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "fill",
    transformOrigin: "30% 15%",
    transformStyle: "preserve-3d",
  },

  seal: {
    position: "absolute",
    width: "23%",
    maxWidth: 150,
    aspectRatio: "1/1",
    left: "37.5%",
    top: "50%", // Adjust this value if the flap tip is higher/lower
    transform: "translate(-50%, -50%)",
    zIndex: 25,
  },

  glow: {
    position: "absolute",
    left: "50%",
    top: "60%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    borderRadius: "50%",
    background: "radial-gradient(circle, white 0%, rgba(255,255,255,0.7) 30%, transparent 70%)",
    zIndex: 1,
    pointerEvents: "none",
  },

  flash: {
    position: "fixed",
    inset: 0,
    background: "white",
    opacity: 0,
    pointerEvents: "none",
    zIndex: 100,
  },
};

export default function FullScreenEnvelope({ onStartOpen, onOpen, guestName, maxAttendees }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const controls = useAnimationControls();

  const handleTap = async () => {
    if (playing) return;
    setPlaying(true);

    // Let the parent know the sequence started so music can play
    onStartOpen?.();

    // Sequence: Seal press -> dissolve -> flap open -> light burst
    await controls.start("sealPress");
    await controls.start("sealDissolve");

    // Parallel animations for opening
    controls.start("openFlap");
    controls.start("lightBurst");

    // Trigger completion when the screen is fully white
    // Flash animation: 0.5s delay + 2.5s duration = 3.0s total
    // We trigger just before it finishes to ensure overlap
    setTimeout(() => {
      onOpen?.();
    }, 2800);
  };

  return (
    <div style={styles.stage} onClick={handleTap}>
      {/* Language Toggle */}
      <div style={{ position: "absolute", top: "40px", right: "40px", zIndex: 150 }}>
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering the envelope animation
            toggleLanguage();
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-wedding-tan bg-wedding-cream/60 backdrop-blur-sm text-wedding-gold font-roboto text-xs uppercase tracking-widest hover:bg-wedding-tan/30 transition-colors shadow-sm">
          {lang === "en" ? "ES" : "EN"}
        </button>
      </div>

      {/* Tap to Open Hint */}
      {!playing && (
        <motion.div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Montserrat', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontWeight: 300,
            fontSize: "min(2.8vw, 11px)",
            color: "#4a3c31",
            opacity: 0.7,
            zIndex: 60,
            whiteSpace: "nowrap",
          }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          {t("openHint")}
        </motion.div>
      )}

      {/* White Flash Overlay */}
      <motion.div
        style={styles.flash}
        variants={{
          idle: { opacity: 0 },
          lightBurst: {
            opacity: [0, 1],
            transition: { duration: 2.5, ease: "easeIn", delay: 0.5 },
          },
        }}
        initial="idle"
        animate={controls}
      />

      <div style={styles.container}>
        {/* Text Group */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <div style={styles.headerText}>{t("exclusiveInvite")}</div>
          <div style={styles.namesText}>{guestName}</div>
          {maxAttendees > 1 && <div style={styles.headerText}>{t("andFamily")}</div>}
        </motion.div>

        {/* Envelope Group */}
        <div style={{ position: "relative" }}>
          {/* The Envelope — floating */}
          <motion.div
            style={styles.envelopeWrapper}
            animate={
              !playing
                ? {
                    y: [0, -8, 0],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            {/* BACK PAPER */}
            <img src={backPaper} style={styles.back} alt="" />

            {/* HEAVENLY GLOW */}
            <motion.div
              style={styles.glow}
              variants={{
                idle: {
                  opacity: 0,
                  scale: 0.7,
                  filter: "blur(20px)",
                },
                lightBurst: {
                  opacity: [0, 1, 0.9],
                  scale: [0.7, 1.5, 1.3],
                  filter: ["blur(20px)", "blur(40px)", "blur(35px)"],
                  transition: {
                    duration: 3.5, // Slow motion
                    ease: [0.2, 0.9, 0.2, 1],
                    delay: 0.2,
                  },
                },
              }}
              initial="idle"
              animate={controls}
            />

            {/* TOP FLAP */}
            <motion.img
              src={topFlap}
              style={styles.flap}
              alt=""
              variants={{
                idle: { rotateX: 0 },
                openFlap: {
                  rotateX: 110, // Partial open for 3D effect
                  transition: {
                    duration: 3.0, // Slow motion
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              initial="idle"
              animate={controls}
            />

            {/* WAX SEAL */}
            <motion.img
              src={sealSVG}
              alt="Wax Seal"
              style={styles.seal}
              variants={{
                idle: {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  filter: "drop-shadow(0px 8px 20px rgba(0,0,0,0.25))",
                },
                sealPress: {
                  scale: 1.05,
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                },
                sealDissolve: {
                  opacity: [1, 1, 0],
                  scale: [1.05, 1.15, 0.9],
                  y: [-4, -10, -18],
                  filter: ["drop-shadow(0px 8px 20px rgba(0,0,0,0.25))", "drop-shadow(0px 0px 0px rgba(0,0,0,0)) blur(2px)", "blur(6px)"],
                  transition: {
                    duration: 1.0, // A bit slower too
                    ease: "easeOut",
                  },
                },
              }}
              initial="idle"
              animate={controls}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
