import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import styles from './MythVsFact.module.css'

const Icons = {
  Search: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Target: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Clock: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Medal: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Shield: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Star: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Stop: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  Check: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Trophy: () => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
}

const QUESTIONS = [
  {
    id: 1,
    character: 'Anu',
    statement: 'Trying drugs just once won\'t hurt me.',
    answer: 'myth',
    explanation: 'Even one use can be dangerous. Some drugs can cause severe reactions, accidents, or lead to repeated use.',
  },
  {
    id: 2,
    character: 'Meera',
    statement: 'Vapes are just flavored water vapor.',
    answer: 'myth',
    explanation: 'Many vapes contain nicotine and other chemicals that can affect developing brains and lungs.',
  },
  {
    id: 3,
    character: 'Arjun',
    statement: 'Only bad students use drugs.',
    answer: 'myth',
    explanation: 'Substance abuse can affect people from any background. Good choices and support systems help prevent it.',
  },
  {
    id: 4,
    character: 'Rahul',
    statement: 'Prescription medicines are always safe.',
    answer: 'myth',
    explanation: 'Medicines are safe only when used as directed by a doctor. Misusing them can be dangerous.',
  },
  {
    id: 5,
    character: 'Priya',
    statement: 'Drugs help people perform better in school.',
    answer: 'myth',
    explanation: 'Drug use often affects memory, concentration, decision-making, and academic performance.',
  },
  {
    id: 6,
    character: 'Deepak',
    statement: 'If my friends do it, I should too.',
    answer: 'myth',
    explanation: 'Real friends respect your decisions. Saying "No" is a sign of confidence and responsibility.',
  },
  {
    id: 7,
    character: 'Sneha',
    statement: 'Energy pills and unknown tablets are harmless.',
    answer: 'myth',
    explanation: 'Never take unknown substances. They may contain harmful or illegal ingredients.',
  },
  {
    id: 8,
    character: 'Vikram',
    statement: 'Asking for help is a weakness.',
    answer: 'myth',
    explanation: 'Asking for help shows courage and maturity. It is a sign of strength, not weakness.',
  },
  {
    id: 9,
    character: 'Kavya',
    statement: 'Drug addiction happens only to adults.',
    answer: 'myth',
    explanation: 'Young people can also be affected. Prevention and awareness are important at every age.',
  },
  {
    id: 10,
    character: 'Arun',
    statement: 'A healthy lifestyle isn\'t important.',
    answer: 'myth',
    explanation: 'Exercise, hobbies, good sleep, and supportive friends help protect physical and mental health.',
  },
]

const BADGES = [
  { threshold: 3, icon: <Icons.Medal />, name: 'Myth Buster', desc: 'Identified 3 misconceptions' },
  { threshold: 5, icon: <Icons.Search />, name: 'Truth Seeker', desc: 'Uncovered 5 truths' },
  { threshold: 8, icon: <Icons.Shield />, name: 'Drug-Free Champion', desc: 'Defended against 8 myths' },
  { threshold: 10, icon: <Icons.Star />, name: 'Toofan Agent', desc: 'Completed the full mission' },
]

const TIMER_SECONDS = 10

function Confetti() {
  const colors = ['var(--green-400)', 'var(--purple-400)', 'var(--amber-100)', 'var(--coral-400)', 'var(--teal-400)']
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(Math.random() - 0.5) * 300}px`,
    delay: Math.random() * 0.3,
    color: colors[i % colors.length],
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 6,
  }))

  return (
    <div className={styles.confetti}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className={styles.confettiPiece}
          initial={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            y: 200 + Math.random() * 150,
            x: parseFloat(p.left),
            rotate: p.rotation + 360,
            scale: 0.4,
          }}
          transition={{ duration: 1.2 + Math.random() * 0.5, delay: p.delay, ease: 'easeOut' }}
          style={{
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

// ── Start Screen ──
function StartScreen({ onStart }) {
  return (
    <motion.div
      className={styles.startScreen}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.startIcon}><Icons.Search /></div>
      <h3 className={styles.startTitle}>Drug Detective Mission</h3>
      <p className={styles.startSub}>
        10 statements. Are they Myth or Fact? Investigate each case and earn your badges.
      </p>
      <div className={styles.startFeatures}>
        <div className={styles.startFeature}>
          <span><Icons.Target /></span>
          <span>10 Cases</span>
        </div>
        <div className={styles.startFeature}>
          <span><Icons.Clock /></span>
          <span>Timed Rounds</span>
        </div>
        <div className={styles.startFeature}>
          <span><Icons.Medal /></span>
          <span>Earn Badges</span>
        </div>
      </div>
      <motion.button
        className={styles.startBtn}
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Begin Investigation →
      </motion.button>
    </motion.div>
  )
}

// ── Question Card ──
function QuestionCard({ question, index, onAnswer }) {
  const [timer, setTimer] = useState(TIMER_SECONDS)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const mythOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0])
  const factOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1])

  useEffect(() => {
    setTimer(TIMER_SECONDS)
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [question.id])

  const handleDragEnd = useCallback((_, info) => {
    if (info.offset.x < -100) {
      onAnswer('myth')
    } else if (info.offset.x > 100) {
      onAnswer('fact')
    }
  }, [onAnswer])

  const timerPercent = (timer / TIMER_SECONDS) * 100
  const timerClass = timer > 6 ? styles.timerFillNormal : timer > 3 ? styles.timerFillWarning : styles.timerFillDanger

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.cardFace}>
        {/* Timer bar */}
        <div className={styles.timerBar}>
          <div
            className={`${styles.timerFill} ${timerClass}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Case heading */}
        <div className={styles.caseNumber}>
          <span className={styles.caseIcon}><Icons.Search /></span>
          Case #{String(index + 1).padStart(2, '0')}
        </div>

        {/* Statement */}
        <div className={styles.statementQuote}>
          <strong>{question.character}</strong> says: {question.statement}
        </div>

        {/* Swipe indicators (visible while dragging) */}
        <div style={{ position: 'relative' }}>
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: mythOpacity,
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--coral-400)',
              pointerEvents: 'none',
            }}
          >
            ← MYTH
          </motion.div>
          <motion.div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: factOpacity,
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--green-600)',
              pointerEvents: 'none',
            }}
          >
            FACT →
          </motion.div>
        </div>

        {/* Buttons */}
        <div className={styles.answerBtns}>
          <motion.button
            className={styles.mythBtn}
            onClick={() => onAnswer('myth')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.btnIcon}><Icons.Stop /></span>
            MYTH
          </motion.button>
          <motion.button
            className={styles.factBtn}
            onClick={() => onAnswer('fact')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.btnIcon}><Icons.Check /></span>
            FACT
          </motion.button>
        </div>

        <p className={styles.swipeHint}>Swipe left for Myth · Swipe right for Fact</p>
      </div>
    </motion.div>
  )
}

// ── Result Card ──
function ResultCard({ question, isCorrect, onNext, isLast, newBadge, showConfetti }) {
  return (
    <motion.div
      className={styles.cardFace}
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      style={{ position: 'relative' }}
    >
      {showConfetti && <Confetti />}

      <div className={styles.resultOverlay}>
        <motion.div
          className={styles.resultIcon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
        >
          {isCorrect ? <Icons.Check /> : <Icons.X />}
        </motion.div>

        <div className={`${styles.resultLabel} ${isCorrect ? styles.resultCorrect : styles.resultIncorrect}`}>
          {isCorrect ? 'Correct! Well investigated.' : 'Not quite right.'}
        </div>

        <div className={styles.resultExplanation}>
          <strong><Icons.Search /> Investigation Result:</strong><br />
          The statement is a <strong style={{ color: question.answer === 'myth' ? 'var(--coral-400)' : 'var(--green-600)' }}>
            {question.answer.toUpperCase()}
          </strong>. {question.explanation}
        </div>

        {isCorrect && (
          <motion.div
            className={styles.pointsEarned}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Icons.Star /> +10 Points Earned
          </motion.div>
        )}

        {newBadge && (
          <motion.div
            className={styles.badgeUnlock}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          >
            <span className={styles.badgeIcon}>{newBadge.icon}</span>
            <div className={styles.badgeInfo}>
              <div className={styles.badgeLabel}>Badge Unlocked!</div>
              <div className={styles.badgeName}>{newBadge.name}</div>
            </div>
          </motion.div>
        )}

        <motion.button
          className={styles.nextBtn}
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isLast ? 'View Results →' : 'Next Case →'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── End Screen ──
function EndScreen({ score, correctCount, onReplay, navigate }) {
  const earnedBadges = BADGES.filter((b) => correctCount >= b.threshold)
  const title =
    correctCount === 10
      ? 'Mission Complete!'
      : correctCount >= 7
      ? 'Great Work, Agent!'
      : correctCount >= 4
      ? 'Good Effort, Agent'
      : 'Keep Learning, Agent'

  return (
    <motion.div
      className={styles.endScreen}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={styles.endTitle}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <Icons.Trophy /> {title}
      </motion.div>
      <p className={styles.endSubtitle}>Operation Toofan — Investigation Complete</p>

      <motion.div
        className={styles.scoreCircle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <div className={styles.scoreValue}>{score}</div>
        <div className={styles.scoreLabel}>out of 100</div>
      </motion.div>

      <div className={styles.badgesEarned}>
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.name}
            className={`${styles.earnedBadge} ${correctCount < badge.threshold ? styles.earnedBadgeLocked : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <span>{badge.icon}</span>
            {badge.name}
          </motion.div>
        ))}
      </div>

      <ul className={styles.skillsList}>
        <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <span className={styles.skillCheck}><Icons.Check /></span> Resist peer pressure
        </motion.li>
        <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
          <span className={styles.skillCheck}><Icons.Check /></span> Make healthy choices
        </motion.li>
        <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
          <span className={styles.skillCheck}><Icons.Check /></span> Help create a drug-free community
        </motion.li>
      </ul>

      <p className={styles.endQuote}>
        "I choose health. I choose my future. I choose a drug-free life."
      </p>

      <div className={styles.endCtas}>
        <motion.button
          className={styles.replayBtn}
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ↻ Replay
        </motion.button>
        <motion.button
          className={styles.pledgeBtn}
          onClick={() => navigate('game')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take the Pledge →
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Main Component ──
export default function MythVsFact({ navigate }) {
  const [phase, setPhase] = useState('start') // 'start' | 'question' | 'result' | 'end'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [newBadge, setNewBadge] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const progress = phase === 'start' ? 0 : ((currentIndex + (phase === 'result' || phase === 'end' ? 1 : 0)) / QUESTIONS.length) * 100

  const handleStart = () => {
    setPhase('question')
    setCurrentIndex(0)
    setScore(0)
    setCorrectCount(0)
  }

  const handleAnswer = useCallback((answer) => {
    const isCorrect = answer === currentQuestion.answer
    setLastCorrect(isCorrect)

    let newCorrect = correctCount
    if (isCorrect) {
      setScore((prev) => prev + 10)
      newCorrect = correctCount + 1
      setCorrectCount(newCorrect)
    }

    // Check for new badge
    const justEarnedBadge = BADGES.find(
      (b) => newCorrect >= b.threshold && correctCount < b.threshold
    )
    setNewBadge(justEarnedBadge || null)
    setShowConfetti(isCorrect)

    setPhase('result')
  }, [currentQuestion, correctCount])

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setPhase('question')
      setNewBadge(null)
      setShowConfetti(false)
    } else {
      setPhase('end')
    }
  }

  const handleReplay = () => {
    setPhase('start')
    setCurrentIndex(0)
    setScore(0)
    setCorrectCount(0)
    setNewBadge(null)
    setShowConfetti(false)
  }

  return (
    <div className={styles.gameWrapper}>
      {/* Progress bar (hidden on start/end) */}
      {(phase === 'question' || phase === 'result') && (
        <motion.div
          className={styles.progressArea}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>
              <Icons.Search /> Mission Progress
            </span>
            <span className={styles.progressCount}>
              {currentIndex + (phase === 'result' ? 1 : 0)}/{QUESTIONS.length} Cases
            </span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}

      {/* Card scene */}
      <div className={styles.cardScene}>
        <AnimatePresence mode="wait">
          {phase === 'start' && (
            <motion.div key="start" exit={{ opacity: 0, scale: 0.9 }}>
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'question' && (
            <QuestionCard
              key={`q-${currentIndex}`}
              question={currentQuestion}
              index={currentIndex}
              onAnswer={handleAnswer}
            />
          )}

          {phase === 'result' && (
            <motion.div key={`r-${currentIndex}`}>
              <ResultCard
                question={currentQuestion}
                isCorrect={lastCorrect}
                onNext={handleNext}
                isLast={currentIndex === QUESTIONS.length - 1}
                newBadge={newBadge}
                showConfetti={showConfetti}
              />
            </motion.div>
          )}

          {phase === 'end' && (
            <motion.div key="end" exit={{ opacity: 0 }}>
              <EndScreen
                score={score}
                correctCount={correctCount}
                onReplay={handleReplay}
                navigate={navigate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
