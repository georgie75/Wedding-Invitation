import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
    const { t } = useLanguage()

    return (
        <section className="h-screen flex flex-col items-center justify-center bg-wedding-cream text-center px-6">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                {/* Decorative rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                        <ellipse cx="22" cy="20" rx="14" ry="14" stroke="#C4A44E" strokeWidth="1.2" fill="none" opacity="0.5" />
                        <ellipse cx="38" cy="20" rx="14" ry="14" stroke="#C4A44E" strokeWidth="1.2" fill="none" opacity="0.5" />
                    </svg>
                </motion.div>

                <motion.p
                    className="font-playfair text-wedding-text text-2xl mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Alexus & Luis
                </motion.p>

                <motion.p
                    className="text-sm text-wedding-gold tracking-[0.3em] uppercase font-roboto mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    28 · 03 · 2026
                </motion.p>

                <motion.div
                    className="h-px w-24 bg-wedding-tan/50 mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                />

                <motion.p
                    className="text-xs text-wedding-text-light font-roboto tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    {t('madeWithLove')}
                </motion.p>
            </motion.div>
        </section>
    )
}

export default Footer
