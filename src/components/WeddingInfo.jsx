import React from 'react'

export const DetailWhen = () => (
    <section className="h-screen flex items-center justify-center bg-wedding-cream text-center px-6">
        <div className="max-w-md mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto">Celebration Details</p>
            <h2 className="text-4xl font-playfair text-wedding-text mb-10">The Date</h2>
            <div className="p-10 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30">
                <div className="text-wedding-gold text-4xl mb-4">📅</div>
                <h3 className="text-2xl font-playfair font-bold mb-3 text-wedding-text">When</h3>
                <p className="font-roboto text-wedding-text-light text-lg">March 28, 2026</p>
                <p className="font-roboto text-wedding-text-light text-lg">4:00 PM Ceremony</p>
            </div>
        </div>
    </section>
)

export const DetailWhere = () => (
    <section className="h-screen flex items-center justify-center bg-wedding-cream text-center px-6">
        <div className="max-w-md mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto">Celebration Details</p>
            <h2 className="text-4xl font-playfair text-wedding-text mb-10">The Venue</h2>
            <div className="p-10 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30">
                <div className="text-wedding-gold text-4xl mb-4">📍</div>
                <h3 className="text-2xl font-playfair font-bold mb-3 text-wedding-text">Where</h3>
                <p className="font-roboto text-wedding-text-light text-lg">The Grand Garden Estate</p>
                <p className="font-roboto text-wedding-text-light text-lg">123 Wedding Lane, Cityville</p>
            </div>
        </div>
    </section>
)

export const DetailReception = () => (
    <section className="h-screen flex items-center justify-center bg-wedding-cream text-center px-6">
        <div className="max-w-md mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold mb-2 font-roboto">Celebration Details</p>
            <h2 className="text-4xl font-playfair text-wedding-text mb-10">The Celebration</h2>
            <div className="p-10 bg-wedding-champagne/40 rounded-lg border border-wedding-tan/30">
                <div className="text-wedding-gold text-4xl mb-4">🥂</div>
                <h3 className="text-2xl font-playfair font-bold mb-3 text-wedding-text">Reception</h3>
                <p className="font-roboto text-wedding-text-light text-lg">Dinner & Dancing</p>
                <p className="font-roboto text-wedding-text-light text-lg">to follow immediately</p>
            </div>
        </div>
    </section>
)
