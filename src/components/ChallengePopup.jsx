import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChallengePopup({ challengerName, onAccept, onClose }) {
  const [visible, setVisible] = useState(true)

  const handleAccept = () => {
    setVisible(false)
    setTimeout(() => onAccept(), 400)
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 400)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={overlayStyle}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', bounce: 0.35, duration: 0.6 }}
            style={cardStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={handleClose} style={closeBtnStyle} aria-label="Close">
              X
            </button>

            {/* Logo */}
            <motion.img
              src="/assets/logo.png"
              alt="Operation Toofan"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
              style={logoStyle}
            />

            {/* Challenge message */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={titleStyle}
            >
              <span style={{ color: 'var(--primary)' }}>{challengerName}</span> challenged you to take the pledge{' '}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" style={{ display: 'inline', verticalAlign: 'middle', textShadow: '2px 2px 0 #000' }}>
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-2.5 5-4 6.5-1.5 1.5-3 2.5-5 3.5z"/>
                <path d="M10.7 20.7c-1-2.7.3-5.2 1.8-7.2 1.5-2 3.4-3.4 5.5-4"/>
              </svg>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={subtitleStyle}
            >
              They just completed the Operation Toofan drug-free quest and think you should too.
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              onClick={handleAccept}
              className="btn-primary"
              style={{ margin: '1rem 0' }}
            >
              Take the pledge
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={hintStyle}
            >
              It only takes 5 minutes
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── inline styles (no CSS module needed for a one-off modal) ─── */

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(4px)',
  padding: '1.5rem',
}

const cardStyle = {
  position: 'relative',
  background: '#0a0e2e',
  border: '4px solid var(--border)',
  borderRadius: '0px', // Retro sharp corners
  padding: '2.5rem 2rem 2rem',
  maxWidth: '420px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '8px 8px 0 rgba(0,0,0,0.8)',
}

const closeBtnStyle = {
  position: 'absolute',
  top: '12px',
  right: '14px',
  background: 'none',
  border: 'none',
  fontFamily: 'var(--font-pixel)',
  fontSize: '16px',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  padding: '4px',
  lineHeight: 1,
}

const logoStyle = {
  width: '72px',
  height: 'auto',
  marginBottom: '1rem',
  imageRendering: 'pixelated',
}

const titleStyle = {
  fontFamily: 'var(--font-pixel)',
  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
  fontWeight: 400,
  color: 'var(--text)',
  marginBottom: '1rem',
  lineHeight: 1.4,
  textShadow: '2px 2px 0 #000',
  textTransform: 'uppercase',
}

const subtitleStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--text-muted)',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
}

const hintStyle = {
  fontFamily: 'var(--font-pixel)',
  fontSize: '9px',
  color: 'var(--danger)',
  marginTop: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}
