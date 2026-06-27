import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../utils/supabase'
import styles from './CommunityWall.module.css'

const getCheerData = () => JSON.parse(localStorage.getItem('toofan_cheers') || '{}')

// ─── Heart-burst cheer button ────────────────────────────────────────────────
function CheerButton({ pledge, pledgeKey }) {
  const [count, setCount] = useState(() => {
    return pledge?.likes !== undefined ? pledge.likes : (getCheerData()[pledgeKey] || 0)
  })
  const [particles, setParticles] = useState([])
  const nextId = useRef(0)
  const btnRef = useRef(null)

  useEffect(() => {
    if (pledge?.likes !== undefined) {
      setCount(pledge.likes)
    }
  }, [pledge?.likes])

  const handleCheer = async () => {
    const historyKey = 'toofan_cheer_history'
    let history = JSON.parse(localStorage.getItem(historyKey) || '[]')
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000
    
    history = history.filter(time => time > oneHourAgo)
    
    if (history.length >= 50) {
      alert("You've reached the limit of 50 cheers per hour. Take a break!")
      return
    }

    history.push(now)
    localStorage.setItem(historyKey, JSON.stringify(history))

    const newCount = count + 1
    setCount(newCount)
    
    const cheers = getCheerData()
    cheers[pledgeKey] = newCount
    localStorage.setItem('toofan_cheers', JSON.stringify(cheers))

    if (import.meta.env.VITE_SUPABASE_URL && pledge?.id) {
      try {
        const { data } = await supabase.from('pledges').select('likes').eq('id', pledge.id).single()
        const currentLikes = data?.likes || 0
        await supabase.from('pledges').update({ likes: currentLikes + 1 }).eq('id', pledge.id)
      } catch (err) {
        console.error('Error cheering globally', err)
      }
    }

    // Spawn 6-8 mini-heart particles
    const batch = []
    const numHearts = 6 + Math.floor(Math.random() * 3)
    for (let i = 0; i < numHearts; i++) {
      batch.push({
        id: nextId.current++,
        x: (Math.random() - 0.5) * 60,
        y: -(20 + Math.random() * 50),
        rot: (Math.random() - 0.5) * 90,
        scale: 0.6 + Math.random() * 0.7,
        delay: Math.random() * 0.08,
      })
    }
    setParticles(prev => [...prev, ...batch])

    // Clean up after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !batch.includes(p)))
    }, 900)
  }

  return (
    <div className={styles.cheerWrap}>
      <motion.button
        ref={btnRef}
        className={styles.cheerBtn}
        onClick={handleCheer}
        whileTap={{ scale: 1.3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        aria-label={`Cheer this pledge (${count})`}
      >
        <span className={styles.cheerHeart}>❤</span>
        {count > 0 && <span className={styles.cheerCount}>{count}</span>}
      </motion.button>

      {/* Particle burst */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            className={styles.heartParticle}
            initial={{ opacity: 1, x: 0, y: 0, scale: p.scale, rotate: 0 }}
            animate={{
              opacity: 0,
              x: p.x,
              y: p.y,
              scale: p.scale * 0.3,
              rotate: p.rot,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: p.delay, ease: [0.2, 0.8, 0.4, 1] }}
          >
            ❤
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}


const VALUE_COLORS = {
  'My health': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'My future': { bg: 'var(--purple-50)', color: 'var(--purple-800)' },
  'My family': { bg: 'var(--teal-50)', color: 'var(--teal-800)' },
  'My friends': { bg: '#e6f1fb', color: '#0c447c' },
  'My dreams': { bg: 'var(--amber-50)', color: 'var(--amber-600)' },
  'My freedom': { bg: 'var(--coral-50)', color: 'var(--coral-600)' },
}

export default function CommunityWall({ navigate }) {
  const [filter, setFilter] = useState('all')
  const [localPledges, setLocalPledges] = useState([])

  useEffect(() => {
    async function loadPledges() {
      if (import.meta.env.VITE_SUPABASE_URL) {
        try {
          const { data, error } = await supabase
            .from('pledges')
            .select('*')
            .order('id', { ascending: false })
            .limit(50)
          if (error) throw error
          if (data) setLocalPledges(data)
        } catch (err) {
          console.error('Error loading pledges from Supabase', err)
        }
      } else {
        const saved = JSON.parse(localStorage.getItem('toofan_pledges') || '[]')
        setLocalPledges(saved)
      }
    }
    loadPledges()
  }, [])

  const allPledges = localPledges
  const totalPledges = localPledges.length

  const values = ['all', 'My health', 'My family', 'My future', 'My dreams', 'My freedom', 'My friends']
  const filtered = filter === 'all' ? allPledges : allPledges.filter(p => p.values.includes(filter))

  return (
    <div className={styles.wrap}>
      <div className="bg-grid-fade" />
      <div className={styles.inner}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <div className={styles.eyebrow}>✦ Live community</div>
          <h1 className={styles.title}>The pledge wall</h1>
          <p>Every name here is a real commitment. Join them.</p>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className={styles.counter}
          >
            <div className={styles.counterNum}>{totalPledges.toLocaleString()}</div>
            <div className={styles.counterLabel}>pledges taken worldwide</div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={styles.filters}
        >
          {values.map(v => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={v}
              className={`${styles.filterBtn} ${filter === v ? styles.filterActive : ''}`}
              onClick={() => setFilter(v)}
            >
              {v === 'all' ? 'All pledges' : v}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div 
                key={p.name + p.date + i} 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, type: 'spring' }}
                whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <img
                    src="/assests/dummy-avatar.jpg"
                    alt=""
                    className={styles.avatar}
                    aria-hidden="true"
                  />
                  <div>
                    <div className={styles.cardName}>{p.name}</div>
                    <div className={styles.cardMeta}>{p.date}</div>
                  </div>
                  {p.perfect && (
                    <span className={styles.perfectBadge} title="Perfect score">✦</span>
                  )}
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.cardValues}>
                    {p.values.map(v => (
                      <span
                        key={v}
                        className={styles.valuePill}
                        style={VALUE_COLORS[v] || {}}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <CheerButton pledge={p} pledgeKey={p.id ? `pledge_${p.id}` : `${p.name}_${p.date}_${i}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.cta}
        >
          <p>Add your name to the wall.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary" 
            onClick={() => navigate('game')}
          >
            Take the pledge →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
