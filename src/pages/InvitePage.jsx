import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import Envelope from '../components/Envelope'
import Hero from '../components/Hero'
import WeddingInfo from '../components/WeddingInfo'
import RSVPForm from '../components/RSVPForm'
import Footer from '../components/Footer'

/* ── Scroll-driven fade wrapper ── */
const FadeSection = ({ children, isFirst, isLast }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start", "end start", "end end"],
  })

  // First section: don't fade in (already visible), fade out as you scroll away
  // Last section: fade in, don't fade out
  // Middle sections: fade in AND fade out
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0, 0.85, 1]        // hold at 1, fade out late
      : isLast
        ? [0, 0.15, 1, 1]      // fade in early, hold at 1
        : [0, 0.15, 0.85, 1],  // fade in early, fade out late
    isFirst
      ? [1, 1, 1, 0]
      : isLast
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  )

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0, 0.85, 1]
      : isLast
        ? [0, 0.15, 1, 1]
        : [0, 0.15, 0.85, 1],
    isFirst
      ? [1, 1, 1, 0.97]
      : isLast
        ? [0.97, 1, 1, 1]
        : [0.97, 1, 1, 0.97],
  )

  return (
    <div
      ref={ref}
      className="h-screen"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

const InvitePage = () => {
  const { slug } = useParams()
  const [envelopeOpen, setEnvelopeOpen] = React.useState(false)

  const { data: guest, isLoading, error } = useQuery({
    queryKey: ['guest', slug],
    queryFn: async () => {
      if (slug === 'demo') {
        return {
          id: 'demo-id',
          family_name: 'Smith',
          max_attendees: 2,
          invite_slug: 'demo'
        }
      }

      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('invite_slug', slug)
        .single()

      if (error) throw error
      return data
    },
    retry: false
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wedding-gold"></div>
      </div>
    )
  }

  if (error || !guest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-cream p-4 text-center">
        <h1 className="text-3xl font-playfair text-wedding-text mb-4">Invitation Not Found</h1>
        <p className="text-wedding-text-light">We couldn't find an invitation with that link. Please check the URL.</p>
      </div>
    )
  }

  return (
    <div className="bg-wedding-cream">
      <AnimatePresence>
        {!envelopeOpen && (
          <Envelope
            key="envelope"
            guestName={guest.family_name}
            onOpen={() => setEnvelopeOpen(true)}
          />
        )}
      </AnimatePresence>

      {envelopeOpen && (
        <div
          className="h-screen overflow-y-auto"
          style={{
            scrollSnapType: "y proximity",
            scrollBehavior: "smooth",
          }}
        >
          {/* Transition overlay */}
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <FadeSection isFirst>
            <Hero guestName={guest.family_name} maxAttendees={guest.max_attendees} />
          </FadeSection>

          <FadeSection>
            <WeddingInfo />
          </FadeSection>

          <FadeSection>
            <RSVPForm guestId={guest.id} maxAttendees={guest.max_attendees} />
          </FadeSection>

          <FadeSection isLast>
            <Footer />
          </FadeSection>
        </div>
      )}
    </div>
  )
}

export default InvitePage
