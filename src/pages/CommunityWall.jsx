import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../utils/supabase'
import styles from './CommunityWall.module.css'

const SEED_PLEDGES = []

const BASE_TOTAL_PLEDGES = 0
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

  const allPledges = [...localPledges, ...SEED_PLEDGES]
  const totalPledges = BASE_TOTAL_PLEDGES + localPledges.length

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
            className={styles.primaryBtn} 
            onClick={() => navigate('game')}
          >
            Take the pledge →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
