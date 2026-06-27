import { useState, useEffect, Suspense, lazy } from 'react'
import './index.css'
import ChallengePopup from './components/ChallengePopup'
import { AnimatePresence, motion } from 'framer-motion'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const PledgeGame = lazy(() => import('./pages/PledgeGame'))
const CertificatePage = lazy(() => import('./pages/CertificatePage'))
const CommunityWall = lazy(() => import('./pages/CommunityWall'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))

function getRefFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('ref')
}

export default function App() {
  const [page, setPage] = useState(() => {
    return (window.history.state && window.history.state.page) ? window.history.state.page : 'landing'
  })
  const [pledgeData, setPledgeData] = useState(null)
  const [challengerName, setChallengerName] = useState(getRefFromUrl)

  // Force remove any residual padding on #root in case CSS is cached
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.style.paddingTop = '0'
  }, [])

  // Sync state with browser history for back button support
  useEffect(() => {
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: 'landing' }, '', window.location.search ? window.location.href : window.location.pathname)
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setPage(event.state.page)
      } else {
        setPage('landing')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to, data) => {
    if (data) setPledgeData(data)
    setPage(to)
    window.history.pushState({ page: to }, '', window.location.search ? window.location.href : window.location.pathname)
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
    <main id="main-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Suspense fallback={<div style={{ padding: '24px', color: '#e0e0e0' }}>Loading...</div>}>
            {page === 'landing' && <LandingPage navigate={navigate} />}
            {page === 'game' && <PledgeGame navigate={navigate} />}
            {page === 'certificate' && <CertificatePage data={pledgeData} navigate={navigate} />}
            {page === 'community' && <CommunityWall navigate={navigate} />}
            {page === 'about' && <AboutPage />}
            {page === 'privacy' && <PrivacyPage />}
          </Suspense>
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
    </main>
  )
}
