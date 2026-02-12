import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Envelope = ({ onOpen, guestName }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
        setTimeout(() => {
            onOpen()
        }, 1500) // Wait for animation to finish before unmounting/hiding
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-100 cursor-pointer"
            onClick={handleOpen}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
            <div className="relative w-80 h-56 bg-white shadow-2xl rounded-lg flex items-center justify-center border-2 border-pink-200">
                {/* Envelope Flap */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-pink-200 origin-top z-10"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                    animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Envelope Content Preview (Visible when open) */}
                <motion.div
                    className="absolute top-2 w-[90%] h-[90%] bg-pink-50 border border-pink-100 flex flex-col items-center justify-center text-center p-4 shadow-sm"
                    initial={{ y: 0 }}
                    animate={isOpen ? { y: -60 } : { y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-playfair text-xl text-gray-800">Wedding Invitation</p>
                    <p className="font-roboto text-sm text-gray-600 mt-2">For the {guestName} Family</p>
                </motion.div>

                {/* Envelope Body (Front) */}
                <div
                    className="absolute bottom-0 left-0 w-full h-full border-t-2 border-pink-200 z-20 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top right, #fff 50%, transparent 50%), linear-gradient(to top left, #fff 50%, transparent 50%)',
                        backgroundSize: '100% 100%',
                        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 50%, 0 0)'
                    }}
                ></div>

                {!isOpen && (
                    <motion.p
                        className="absolute -bottom-12 font-playfair text-gray-600 animate-bounce"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Tap to open
                    </motion.p>
                )}
            </div>
        </motion.div>
    )
}

export default Envelope
