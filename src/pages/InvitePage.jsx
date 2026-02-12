import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import Envelope from '../components/Envelope'
import Hero from '../components/Hero'
import WeddingInfo from '../components/WeddingInfo'
import RSVPForm from '../components/RSVPForm'
import Footer from '../components/Footer'

const InvitePage = () => {
  const { slug } = useParams()
  const [envelopeOpen, setEnvelopeOpen] = React.useState(false)

  const { data: guest, isLoading, error } = useQuery({
    queryKey: ['guest', slug],
    queryFn: async () => {
      // Allow a demo/preview mode if slug is 'demo'
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
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || !guest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 text-center">
        <h1 className="text-3xl font-playfair text-gray-800 mb-4">Invitation Not Found</h1>
        <p className="text-gray-600">We couldn't find an invitation with that link. Please check the URL.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero guestName={guest.family_name} maxAttendees={guest.max_attendees} />
          <WeddingInfo />
          <RSVPForm guestId={guest.id} maxAttendees={guest.max_attendees} />
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default InvitePage
