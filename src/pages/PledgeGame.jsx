import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '../components/ProgressBar'
import TypewriterText from '../components/TypewriterText'
import { QUESTIONS, VALUES, buildPledgeText } from '../utils/gameData'
import { supabase } from '../utils/supabase'
import styles from './PledgeGame.module.css'

const STAGE_LABELS = ['Welcome', 'Knowledge', 'Knowledge', 'Knowledge', 'Your values', 'Certificate']

function generatePledgeId(date = new Date()) {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
  const year = date.getFullYear()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `PRC - ${randomPart}-${year}${day}${month}`
}

function ParticleBurst({ active }) {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    if (!active) return
    const batch = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      scale: Math.random() * 0.8 + 0.4,
      rot: Math.random() * 360,
      delay: Math.random() * 0.1
    }))
    setParticles(batch)
  }, [active])

  if (!active) return null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: p.scale, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale * 0.2, rotate: p.rot }}
          transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
          style={{ position: 'absolute', left: '50%', top: '50%', color: 'var(--primary)', fontSize: '20px' }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

export default function PledgeGame({ navigate }) {
  const [stage, setStage] = useState(0)
  const [name, setName] = useState('')
  const [xp, setXp] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [selectedValues, setSelectedValues] = useState([])
  const [floaters, setFloaters] = useState([])
  const [key, setKey] = useState(0)
  const nameRef = useRef(null)

  useEffect(() => {
    setKey(k => k + 1)
    setAnswered(null)
  }, [stage])

  const addFloat = (text, good) => {
    const id = Date.now()
    setFloaters(f => [...f, { id, text, good }])
    setTimeout(() => setFloaters(f => f.filter(x => x.id !== id)), 1800)
  }

  const goNext = () => setStage(s => s + 1)

  const handleStart = () => {
    const trimmedName = name.trim();
    if (!trimmedName) { nameRef.current?.focus(); return }
    
    setXp(0); setScore(0); setSelectedValues([])
    goNext()
  }

  const handleAnswer = (opt, qIdx) => {
    if (answered !== null) return
    setAnswered(opt.text)
    if (opt.correct) {
      setXp(x => x + 1)
      setScore(s => s + 1)
      addFloat('+1 XP', true)
    } else {
      addFloat('Keep going', false)
    }
    setTimeout(() => goNext(), 1400)
  }

  const toggleValue = (v) => {
    setSelectedValues(prev => {
      if (prev.find(x => x.id === v.id)) return prev.filter(x => x.id !== v.id)
      if (prev.length >= 3) return prev
      const next = [...prev, v]
      setXp(x => x + 1)
      addFloat('+1 XP', true)
      return next
    })
  }

  const handleSealPledge = async () => {
    const id = generatePledgeId()
    const pledgeText = buildPledgeText(name.trim(), selectedValues)

    const newPledge = {
      name: name.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      perfect: score === QUESTIONS.length,
      values: selectedValues.map(v => v.label)
    }

    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.from('pledges').insert([newPledge])
    } else {
      // Fallback to localStorage if Supabase isn't set up yet
      const savedPledges = JSON.parse(localStorage.getItem('toofan_pledges') || '[]')
      localStorage.setItem('toofan_pledges', JSON.stringify([newPledge, ...savedPledges]))
    }

    navigate('certificate', {
      name: name.trim(),
      pledgeText,
      values: selectedValues,
      score,
      xp,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      id,
      perfect: score === QUESTIONS.length,
    })
  }

  const q = stage >= 1 && stage <= QUESTIONS.length ? QUESTIONS[stage - 1] : null

  return (
    <div className={styles.wrap}>
      <div className="bg-grid-fade" />
      <div className={styles.floaters} aria-hidden="true">
        {floaters.map(f => (
          <div key={f.id} className={`${styles.floater} ${f.good ? styles.floaterGood : styles.floaterNeutral}`}>
            {f.text}
          </div>
        ))}
      </div>

      <div className={styles.inner}>
        {stage > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProgressBar stage={stage} total={QUESTIONS.length + 2} xp={xp} maxXp={QUESTIONS.length + 1} />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${styles.scene} ${styles.welcome}`}
          >
            <motion.div 
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className={styles.welcomeIcon} 
              aria-hidden="true"
            >✦</motion.div>
            <h1 className={styles.welcomeTitle}>Your pledge quest</h1>
            <p className={styles.welcomeSub}>
              {QUESTIONS.length + 2} stages. {QUESTIONS.length} knowledge checks, one pledge you craft yourself, and a certificate that's yours to keep.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge} style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>◎ {QUESTIONS.length} knowledge checks</span>
              <span className={styles.badge} style={{ background: 'var(--purple-50)', color: 'var(--purple-800)' }}>◈ craft your pledge</span>
              <span className={styles.badge} style={{ background: 'var(--amber-50)', color: 'var(--amber-600)' }}>✦ earn a certificate</span>
            </div>
            <div className={styles.nameField}>
              <label htmlFor="pledge-name" className={styles.nameLabel}>Your name</label>
              <input
                id="pledge-name"
                ref={nameRef}
                type="text"
                value={name}
                onChange={e => {
                  const val = e.target.value.replace(/[^A-Za-z\s]/g, '')
                  setName(val)
                }}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name"
                maxLength={60}
                autoFocus
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryBtn} 
              onClick={handleStart}
            >
              Begin quest →
            </motion.button>
          </motion.div>
        )}

        {q && (
          <motion.div 
            key={`question-${stage}`}
            initial={{ opacity: 0, x: 50 }}
            animate={answered !== null && q.options.find(o => o.text === answered)?.correct ? 
              { opacity: 1, x: [0, -8, 8, -8, 8, 0] } : 
              { opacity: 1, x: 0 }
            }
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className={styles.scene}
          >
            <div className={styles.stagePill} style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
              ◎ Stage {stage} of {QUESTIONS.length + 2} - Knowledge check
            </div>
            <h2 className={styles.question}>{q.text}</h2>
            <div className={styles.options}>
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: answered === null ? 1.02 : 1 }}
                  whileTap={{ scale: answered === null ? 0.98 : 1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${styles.option} ${
                    answered === opt.text
                      ? opt.correct ? styles.optCorrect : styles.optWrong
                      : answered && opt.correct ? styles.optCorrect : ''
                  }`}
                  onClick={() => handleAnswer(opt, stage - 1)}
                  disabled={answered !== null}
                >
                  <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                  <span>{opt.text}</span>
                  {answered !== null && opt.correct && <motion.span initial={{scale:0}} animate={{scale:1}} className={styles.optCheck}>✓</motion.span>}
                </motion.button>
              ))}
            </div>
            {answered !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
                className={styles.explanation}
              >
                <div className={styles.explanationIcon}>◎</div>
                <p>{q.explanation}</p>
              </motion.div>
            )}
            <ParticleBurst active={answered !== null && q.options.find(o => o.text === answered)?.correct} />
          </motion.div>
        )}

        {stage === QUESTIONS.length + 1 && (
          <motion.div 
            key="craft"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.scene}
          >
            <div className={styles.stagePill} style={{ background: 'var(--purple-50)', color: 'var(--purple-800)' }}>
              ◈ Stage {QUESTIONS.length + 1} of {QUESTIONS.length + 2} - Craft your pledge
            </div>
            <h2 className={styles.question}>What does this pledge stand for?</h2>
            <p className={styles.valueSub}>Pick up to 3 values that matter most to you</p>
            <div className={styles.valueGrid}>
              {VALUES.map((v, i) => {
                const sel = !!selectedValues.find(x => x.id === v.id)
                return (
                  <motion.button
                    key={v.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.valueBtn} ${sel ? styles.valueSel : ''}`}
                    onClick={() => toggleValue(v)}
                    aria-pressed={sel}
                  >
                    <span className={styles.valueIcon}>{v.icon}</span>
                    <span>{v.label}</span>
                    {sel && <motion.span initial={{scale:0}} animate={{scale:1}} className={styles.valueCheck}>✓</motion.span>}
                  </motion.button>
                )
              })}
            </div>

            <div className={styles.pledgePreview}>
              <div className={styles.pledgePreviewLabel}>Your pledge reads:</div>
              <div className={styles.pledgePreviewText}>
                {selectedValues.length
                  ? buildPledgeText(name, selectedValues)
                  : 'Select values above to shape your pledge.'}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryBtn}
              onClick={handleSealPledge}
              disabled={selectedValues.length === 0}
              style={{ marginTop: '1.5rem' }}
            >
              Seal my pledge →
            </motion.button>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  )
}
