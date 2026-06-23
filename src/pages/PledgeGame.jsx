import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../components/ProgressBar'
import { QUESTIONS, VALUES, buildPledgeText } from '../utils/gameData'
import { supabase } from '../utils/supabase'
import styles from './PledgeGame.module.css'

const STAGE_LABELS = ['Welcome', 'Knowledge', 'Knowledge', 'Knowledge', 'Your values', 'Certificate']

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
    if (!name.trim()) { nameRef.current?.focus(); return }
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
    const id = 'PLG-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + new Date().getFullYear()
    const pledgeText = buildPledgeText(name.trim(), selectedValues)

    const newPledge = {
      name: name.trim(),
      city: 'Hometown Hero',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      perfect: score === QUESTIONS.length,
      values: selectedValues.map(v => v.label)
    }

    const isRobot = name.trim().toLowerCase() === 'robot'

    // Save to Supabase (if configured) and not robot easter egg
    if (!isRobot) {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.from('pledges').insert([newPledge])
      } else {
        // Fallback to localStorage if Supabase isn't set up yet
        const savedPledges = JSON.parse(localStorage.getItem('toofan_pledges') || '[]')
        localStorage.setItem('toofan_pledges', JSON.stringify([newPledge, ...savedPledges]))
      }
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
      <div className={styles.floaters} aria-hidden="true">
        {floaters.map(f => (
          <div key={f.id} className={`${styles.floater} ${f.good ? styles.floaterGood : styles.floaterNeutral}`}>
            {f.text}
          </div>
        ))}
      </div>

      <div className={styles.inner}>
        {stage > 0 && (
          <ProgressBar stage={stage} total={QUESTIONS.length + 2} xp={xp} maxXp={QUESTIONS.length + 1} />
        )}

        {stage === 0 && (
          <div key={key} className={`${styles.scene} ${styles.welcome} animate-fade-up`}>
            <div className={styles.welcomeIcon} aria-hidden="true">✦</div>
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
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name"
                maxLength={60}
                autoFocus
              />
            </div>
            <button className={styles.primaryBtn} onClick={handleStart}>
              Begin quest →
            </button>
          </div>
        )}

        {q && (
          <div key={key} className={`${styles.scene} animate-fade-up`}>
            <div className={styles.stagePill} style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
              ◎ Stage {stage} of {QUESTIONS.length + 2} - Knowledge check
            </div>
            <h2 className={styles.question}>{q.text}</h2>
            <div className={styles.options}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
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
                  {answered !== null && opt.correct && <span className={styles.optCheck}>✓</span>}
                </button>
              ))}
            </div>
            {answered !== null && (
              <div className={`${styles.explanation} animate-fade-up`}>
                <div className={styles.explanationIcon}>◎</div>
                <p>{q.explanation}</p>
              </div>
            )}
          </div>
        )}

        {stage === QUESTIONS.length + 1 && (
          <div key={key} className={`${styles.scene} animate-fade-up`}>
            <div className={styles.stagePill} style={{ background: 'var(--purple-50)', color: 'var(--purple-800)' }}>
              ◈ Stage {QUESTIONS.length + 1} of {QUESTIONS.length + 2} - Craft your pledge
            </div>
            <h2 className={styles.question}>What does this pledge stand for?</h2>
            <p className={styles.valueSub}>Pick up to 3 values that matter most to you</p>
            <div className={styles.valueGrid}>
              {VALUES.map(v => {
                const sel = !!selectedValues.find(x => x.id === v.id)
                return (
                  <button
                    key={v.id}
                    className={`${styles.valueBtn} ${sel ? styles.valueSel : ''}`}
                    onClick={() => toggleValue(v)}
                    aria-pressed={sel}
                  >
                    <span className={styles.valueIcon}>{v.icon}</span>
                    <span>{v.label}</span>
                    {sel && <span className={styles.valueCheck}>✓</span>}
                  </button>
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

            <button
              className={styles.primaryBtn}
              onClick={handleSealPledge}
              disabled={selectedValues.length === 0}
              style={{ marginTop: '1.5rem' }}
            >
              Seal my pledge →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
