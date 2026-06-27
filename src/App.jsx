import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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

function AnimatedRoutes({ pledgeData, setPledgeData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [challengerName, setChallengerName] = useState(getRefFromUrl);

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
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <LandingPage />
            </motion.div>
          } />
          <Route path="/game" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <PledgeGame onComplete={(data) => { setPledgeData(data); navigate('/certificate'); }} />
            </motion.div>
          } />
          <Route path="/certificate" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <CertificatePage data={pledgeData} />
            </motion.div>
          } />
          <Route path="/community" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <CommunityWall />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <AboutPage />
            </motion.div>
          } />
          <Route path="/privacy" element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <PrivacyPage />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      {/* Challenge popup when opened via a shared ?ref= link */}
      {challengerName && (
        <ChallengePopup
          challengerName={challengerName}
          onAccept={() => {
            setChallengerName(null)
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('ref');
            window.history.replaceState({}, '', newUrl);
            navigate('/game')
          }}
          onClose={() => {
            setChallengerName(null)
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('ref');
            window.history.replaceState({}, '', newUrl);
          }}
        />
      )}
    </>
  )
}

export default function App() {
  const [pledgeData, setPledgeData] = useState(null)

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.style.paddingTop = '0'
  }, [])

  return (
    <main id="main-content">
      <Suspense fallback={<div style={{ padding: '24px', color: '#e0e0e0' }}>Loading...</div>}>
        <AnimatedRoutes pledgeData={pledgeData} setPledgeData={setPledgeData} />
      </Suspense>
    </main>
  )
}
