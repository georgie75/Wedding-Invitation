import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import backPaper from "../assets/backpaper.png";
import topFlap from "../assets/topFlap.png";
import sealSVG from "../assets/envelope/A&L seal.svg";

const styles = {
    stage: {
        position: "fixed",
        inset: 0,
        background: "#f7f2ea",
        overflow: "hidden",
        cursor: "pointer",
        perspective: "1200px",
    },

    back: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    flap: {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transformOrigin: "30% 15%", // hinge point
        transformStyle: "preserve-3d",
    },

    seal: {
        position: "absolute",
        width: 250,
        height: 250,
        left: "17%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
    },

    sealCircle: {
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "#f3eadf",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    initials: {
        fontFamily: "Georgia, serif",
        fontSize: 40,
        color: "#b8925a",
        letterSpacing: "2px",
    },

    innerShadow: {
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 40%)",
        pointerEvents: "none",
        zIndex: 2,
    },

    glow: {
        position: "absolute",
        left: "50%",
        top: "60%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "70%",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, white 0%, rgba(255,255,255,0.7) 30%, transparent 70%)",
        zIndex: 1,
        pointerEvents: "none",
    },

    flash: {
        position: "absolute",
        inset: 0,
        background: "white",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 10,
    },
};


export default function FullScreenEnvelope({ onComplete }) {
    const [playing, setPlaying] = useState(false);
    const controls = useAnimationControls();

    const handleTap = async () => {
        if (playing) return;
        setPlaying(true);

        await controls.start("sealPress");
        await controls.start("sealDissolve");
        await controls.start("openFlap");
        await controls.start("lightBurst");

        setTimeout(() => {
            onComplete?.();
        }, 400);
    };

    return (
        <div style={styles.stage} onClick={handleTap}>
            {/* BACK PAPER */}
            <img src={backPaper} style={styles.back} alt="" />

            {/* INNER SHADOW (appears when opening) */}
            <motion.div
                style={styles.innerShadow}
                variants={{
                    idle: { opacity: 0 },
                    openFlap: { opacity: 1, transition: { duration: 0.6 } },
                }}
                initial="idle"
                animate={controls}
            />

            {/* HEAVENLY GLOW */}
            <motion.div
                style={styles.glow}
                variants={{
                    idle: { opacity: 0, scale: 0.7, filter: "blur(20px)" },
                    lightBurst: {
                        opacity: [0, 1, 0.9],
                        scale: [0.7, 1.5, 1.3],
                        filter: ["blur(20px)", "blur(40px)", "blur(35px)"],
                        transition: { duration: 1.1, ease: [0.2, 0.9, 0.2, 1] },
                    },
                }}
                initial="idle"
                animate={controls}
            />

            {/* FLASH */}
            <motion.div
                style={styles.flash}
                variants={{
                    idle: { opacity: 0 },
                    lightBurst: {
                        opacity: [0, 0.9, 0],
                        transition: { duration: 0.6, times: [0, 0.2, 1] },
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
                        rotateX: 20, // slight open
                        transition: { duration: 1.3, ease: [0.2, 0.9, 0.2, 1] },
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
                        filter: "drop-shadow(0px 8px 20px rgba(0,0,0,0.25))"
                    },
                    sealPress: {
                        scale: 1.05,
                        y: -4,
                        transition: { duration: 0.25, ease: "easeOut" }
                    },
                    sealDissolve: {
                        opacity: [1, 1, 0],
                        scale: [1.05, 1.15, 0.9],
                        y: [-4, -10, -18],
                        filter: [
                            "drop-shadow(0px 8px 20px rgba(0,0,0,0.25))",
                            "drop-shadow(0px 0px 0px rgba(0,0,0,0)) blur(2px)",
                            "blur(6px)"
                        ],
                        transition: { duration: 0.6, ease: "easeOut" }
                    }
                }}
                initial="idle"
                animate={controls}
            />

        </div>
    );
}
