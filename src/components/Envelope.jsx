import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Envelope = ({ onOpen, guestName }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sealBroken, setSealBroken] = useState(false)

    const handleOpen = () => {
        if (isOpen) return
        setSealBroken(true)
        setTimeout(() => setIsOpen(true), 600)
        setTimeout(() => onOpen(), 2800)
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
            onClick={handleOpen}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            style={{ background: 'linear-gradient(160deg, #FBF6F3 0%, #F7E7CE 40%, #EBDFD0 70%, #FBF6F3 100%)' }}
        >
            {/* Subtle shimmer overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, transparent 50%)',
                    backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Envelope container */}
            <div className="relative" style={{ perspective: '1200px' }}>

                {/* Envelope body */}
                <motion.div
                    className="relative w-[320px] h-[220px] md:w-[380px] md:h-[260px]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Envelope back */}
                    <div
                        className="absolute inset-0 rounded-md shadow-2xl"
                        style={{ backgroundColor: '#F7E7CE', border: '1px solid #EBDFD0' }}
                    />

                    {/* Letter/Card that slides up */}
                    <motion.div
                        className="absolute left-3 right-3 top-4 bottom-4 rounded-sm flex flex-col items-center justify-center text-center p-6 z-10"
                        style={{
                            backgroundColor: '#FFFEFB',
                            border: '1px solid #F0E6D8',
                            boxShadow: '0 2px 15px rgba(196,164,78,0.1)',
                        }}
                        animate={isOpen ? { y: -160, opacity: 1 } : { y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="font-playfair text-xs uppercase tracking-[0.25em] text-wedding-gold mb-3">Wedding Invitation</p>
                        <div className="w-12 h-[1px] bg-wedding-gold/40 mb-3"></div>
                        <p className="font-playfair text-lg md:text-xl text-wedding-text">
                            The {guestName} Family
                        </p>
                        <p className="font-roboto text-xs text-wedding-text-light mt-2">October 15, 2026</p>
                    </motion.div>

                    {/* Envelope front flaps (bottom V shape) */}
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-md">
                        {/* Left flap */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-full"
                            style={{
                                background: 'linear-gradient(to top right, #F2E4D1 50%, transparent 50%)',
                                clipPath: 'polygon(0 100%, 50% 45%, 0 0)',
                            }}
                        />
                        {/* Right flap */}
                        <div
                            className="absolute bottom-0 right-0 w-full h-full"
                            style={{
                                background: 'linear-gradient(to top left, #EFE0CC 50%, transparent 50%)',
                                clipPath: 'polygon(100% 100%, 50% 45%, 100% 0)',
                            }}
                        />
                        {/* Bottom flap */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-full"
                            style={{
                                background: 'linear-gradient(to top, #F7E7CE 30%, #F0DAC0 100%)',
                                clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)',
                            }}
                        />
                    </div>

                    {/* Top flap (opens) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full z-30 origin-top"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                            transformStyle: 'preserve-3d',
                        }}
                        animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Front of flap */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to bottom, #F5E2CB 0%, #EDD8C0 100%)',
                                clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                        {/* Back of flap (visible when opened) */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to top, #E8D4BC 0%, #F0DCC8 100%)',
                                clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateX(180deg)',
                            }}
                        />
                    </motion.div>

                    {/* Wax Seal */}
                    <motion.div
                        className="absolute z-40 flex items-center justify-center"
                        style={{
                            left: '50%',
                            top: '45%',
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px',
                        }}
                        animate={sealBroken
                            ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: [0, 10, -20] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {/* Seal outer ring */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #D4A853 0%, #C4A44E 30%, #A8883A 70%, #8B7030 100%)',
                                boxShadow: '0 4px 15px rgba(164,136,58,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)',
                            }}
                        />
                        {/* Seal wavy edge */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                inset: '3px',
                                border: '2px solid rgba(255,255,255,0.15)',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Seal inner circle */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                inset: '10px',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        />
                        {/* Initials */}
                        <span
                            className="relative z-10 font-playfair text-xl"
                            style={{
                                color: '#F7E7CE',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                            }}
                        >
                            S&M
                        </span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Text below envelope */}
            <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <p className="font-playfair text-lg md:text-xl text-wedding-text leading-relaxed">
                    This invitation is
                </p>
                <p className="font-playfair text-lg md:text-xl text-wedding-text leading-relaxed">
                    exclusively for <span className="italic text-wedding-gold">{guestName}</span>
                </p>
            </motion.div>

            {/* Tap hint */}
            {!isOpen && (
                <motion.p
                    className="absolute bottom-12 text-xs uppercase tracking-[0.2em] text-wedding-text-light/60 font-roboto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 1] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                >
                    Tap to open
                </motion.p>
            )}
        </motion.div>
    )
}

export default Envelope
