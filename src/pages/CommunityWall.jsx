import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import styles from './CommunityWall.module.css'

const SEED_PLEDGES = [
  { name: 'Aarav M.', city: 'Mumbai, India', date: 'Oct 12', perfect: true, values: ['My health', 'My future'] },
  { name: 'Sarah J.', city: 'London, UK', date: 'Oct 12', perfect: false, values: ['My family', 'My freedom'] },
  { name: 'Chen W.', city: 'Singapore', date: 'Oct 11', perfect: true, values: ['My dreams', 'My friends'] },
  { name: 'Elena R.', city: 'Madrid, Spain', date: 'Oct 11', perfect: true, values: ['My family', 'My future'] },
  { name: 'David K.', city: 'New York, USA', date: 'Oct 10', perfect: false, values: ['My health', 'My friends'] },
  { name: 'Fatima A.', city: 'Dubai, UAE', date: 'Oct 10', perfect: true, values: ['My dreams', 'My freedom'] },
]

const BASE_TOTAL_PLEDGES = 15420
const VALUE_COLORS = {
  'My health': { bg: 'var(--green-50)', color: 'var(--green-800)' },
  'My future': { bg: 'var(--purple-50)', color: 'var(--purple-800)' },
  'My family': { bg: 'var(--teal-50)', color: 'var(--teal-800)' },
  'My friends': { bg: '#e6f1fb', color: '#0c447c' },
  'My dreams': { bg: 'var(--amber-50)', color: 'var(--amber-600)' },
  'My freedom': { bg: 'var(--coral-50)', color: 'var(--coral-600)' },
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const AVATAR_COLORS = ['#e1f5ee', '#eeedfe', '#faeeda', '#e6f1fb', '#faece7', '#eaf3de']

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
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>✦ Live community</div>
          <h1 className={styles.title}>The pledge wall</h1>
          <p>Every name here is a real commitment. Join them.</p>

          <div className={styles.counter}>
            <div className={styles.counterNum}>{totalPledges.toLocaleString()}</div>
            <div className={styles.counterLabel}>pledges taken worldwide</div>
          </div>
        </div>

        <div className={styles.filters}>
          {values.map(v => (
            <button
              key={v}
              className={`${styles.filterBtn} ${filter === v ? styles.filterActive : ''}`}
              onClick={() => setFilter(v)}
            >
              {v === 'all' ? 'All pledges' : v}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div
                  className={styles.avatar}
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {initials(p.name)}
                </div>
                <div>
                  <div className={styles.cardName}>{p.name}</div>
                  <div className={styles.cardMeta}>{p.city} · {p.date}</div>
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
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p>Add your name to the wall.</p>
          <button className={styles.primaryBtn} onClick={() => navigate('game')}>
            Take the pledge →
          </button>
        </div>
      </div>
    </div>
  )
}
