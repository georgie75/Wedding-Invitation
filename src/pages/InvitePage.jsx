import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { useLanguage } from '../context/LanguageContext'
import Envelope from '../components/Envelope'
import Hero from '../components/Hero'
import { DetailWhen, DetailWhere, DetailPeople, VerseSection } from '../components/WeddingInfo'
import RSVPForm from '../components/RSVPForm'
import Footer from '../components/Footer'

/**
 * Full-page section with scroll-snap and smooth fade.
 * Uses useInView to detect visibility — when >35% of the section
 * is visible it fades in, when it drops below 35% it fades out.
 */
const FadeSection = ({ children, snap = true }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.35 })

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: isInView ? 1 : 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        minHeight: snap ? '100vh' : undefined,
        scrollSnapAlign: snap ? 'start' : undefined,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </motion.div>
  )
}

const InvitePage = () => {
  const { slug } = useParams()
  const { t } = useLanguage()
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
          style={{
            height: '100vh',
            overflowY: 'auto',
            scrollSnapType: 'y proximity',
            scrollBehavior: 'smooth',
          }}
        >
          {/* White flash transition from envelope */}
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />

          {/* Hero */}
          <div style={{ minHeight: '100vh', scrollSnapAlign: 'start' }}>
            <Hero guestName={guest.family_name} maxAttendees={guest.max_attendees} />
          </div>

          {/* First Bible Verse */}
          <FadeSection>
            <VerseSection text={t('verse1Text')} reference={t('verse1Ref')} />
          </FadeSection>

          {/* When */}
          <FadeSection>
            <DetailWhen />
          </FadeSection>

          {/* Where */}
          <FadeSection>
            <DetailWhere />
          </FadeSection>

          {/* Second Bible Verse */}
          <FadeSection>
            <VerseSection text={t('verse2Text')} reference={t('verse2Ref')} />
          </FadeSection>

          {/* People Involved */}
          <FadeSection>
            <DetailPeople />
          </FadeSection>

          {/* RSVP Form */}
          <FadeSection>
            <RSVPForm guestId={guest.id} maxAttendees={guest.max_attendees} />
          </FadeSection>

          {/* Footer */}
          <FadeSection snap={false}>
            <Footer />
          </FadeSection>
        </div>
      )}
    </div>
  )
}

export default InvitePage
