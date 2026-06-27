import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import styles from './MythVsFact.module.css'
import { Icons } from './Icons'
import { QUESTIONS, BADGES } from '../constants/mythData'



const TIMER_SECONDS = 10

function Confetti() {
  const colors = ['var(--green-400)', 'var(--purple-400)', 'var(--amber-100)', 'var(--coral-400)', 'var(--teal-400)']
  const [pieces] = useState(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(Math.random() - 0.5) * 300}px`,
    delay: Math.random() * 0.3,
    color: colors[i % colors.length],
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 6,
    duration: 1.2 + Math.random() * 0.5,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
    fallOffset: 200 + Math.random() * 150,
  })))

  return (
    <div className={styles.confetti}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className={styles.confettiPiece}
          initial={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            y: p.fallOffset,
            x: parseFloat(p.left),
            rotate: p.rotation + 360,
            scale: 0.4,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          style={{
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.borderRadius,
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
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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
          onClick={() => navigate('/game')}
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
export default function MythVsFact() {
  const navigate = useNavigate();
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
