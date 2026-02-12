import React from 'react'
import { motion } from 'framer-motion'

const WeddingInfo = () => {
    return (
        <section className="py-20 px-6 bg-white text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-playfair text-gray-800 mb-8">The Details</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-pink-50 rounded-lg">
                        <h3 className="text-xl font-playfair font-bold mb-2">When</h3>
                        <p className="font-roboto text-gray-600">October 15, 2026</p>
                        <p className="font-roboto text-gray-600">4:00 PM Ceremony</p>
                    </div>
                    <div className="p-6 bg-pink-50 rounded-lg">
                        <h3 className="text-xl font-playfair font-bold mb-2">Where</h3>
                        <p className="font-roboto text-gray-600">The Grand Garden Estate</p>
                        <p className="font-roboto text-gray-600">123 Wedding Lane, Cityville</p>
                    </div>
                    <div className="p-6 bg-pink-50 rounded-lg">
                        <h3 className="text-xl font-playfair font-bold mb-2">Reception</h3>
                        <p className="font-roboto text-gray-600">Dinner & Dancing</p>
                        <p className="font-roboto text-gray-600">to follow immediately</p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default WeddingInfo
