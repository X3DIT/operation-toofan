import { useState, useEffect } from 'react'
import './index.css'
import LandingPage from './pages/LandingPage'
import PledgeGame from './pages/PledgeGame'
import CertificatePage from './pages/CertificatePage'
import CommunityWall from './pages/CommunityWall'
import SendPage from './pages/SendPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'

import ChallengePopup from './components/ChallengePopup'
import { AnimatePresence, motion } from 'framer-motion'

function getRefFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('ref')
}

export default function App() {
  const initialPage = window.location.pathname.includes('/send') ? 'send' : 'landing'
  const [page, setPage] = useState(initialPage)
  const [pledgeData, setPledgeData] = useState(null)
  const [challengerName, setChallengerName] = useState(getRefFromUrl)

  // Force remove any residual padding on #root in case CSS is cached
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.style.paddingTop = '0'
  }, [])

  const navigate = (to, data) => {
    if (data) setPledgeData(data)
    setPage(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {page === 'landing' && <LandingPage navigate={navigate} />}
          {page === 'game' && <PledgeGame navigate={navigate} />}
          {page === 'certificate' && <CertificatePage data={pledgeData} navigate={navigate} />}
          {page === 'community' && <CommunityWall navigate={navigate} />}
          {page === 'send' && <SendPage />}
          {page === 'about' && <AboutPage />}
          {page === 'privacy' && <PrivacyPage />}
        </motion.div>
      </AnimatePresence>

      {/* Challenge popup when opened via a shared ?ref= link */}
      {challengerName && (
        <ChallengePopup
          challengerName={challengerName}
          onAccept={() => {
            setChallengerName(null)
            // Clear the ref param from the URL without reload
            window.history.replaceState({}, '', window.location.pathname)
            navigate('game')
          }}
          onClose={() => {
            setChallengerName(null)
            window.history.replaceState({}, '', window.location.pathname)
          }}
        />
      )}
    </div>
  )
}
