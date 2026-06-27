/* eslint-disable react-refresh/only-export-components */
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from '../../pages/LandingPage.module.css'

export const QUESTS = [
  {
    num: '01',
    name: 'PREPARE & UNDERSTAND',
    body: 'A 5 minute guided session to test your knowledge regarding choices and their consequences in the real world.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'SHAPE YOUR PLEDGE',
    body: 'Reflect on what matters to you - family, health, dreams. Your pledge will build itself from your choices.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'EARN YOUR CERTIFICATE',
    body: 'Receive a personalized, verifiable certificate of your pledge. Download, share, and inspire others.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    ),
    isLegendary: true,
  },
]

export default function QuestChainSection() {
  const navigate = useNavigate();

  return (
    <motion.section
      className={styles.questSection}
      aria-labelledby="quest-heading"
    >
      <div className={styles.sectionLabelCenter}>HOW IT WORKS</div>
      <h2 id="quest-heading" className={styles.sectionTitleCenter}>THREE STAGES TO YOUR CERTIFICATE</h2>

      <motion.div
        className={`${styles.certificatePreview} ${styles.mobileOnlyCert}`}
      >
        <img src="/assets/cert.png" alt="Certificate Preview" className={styles.certImg} />
      </motion.div>

      <div className={styles.questChain}>
        {QUESTS.map((q, i) => (
          <motion.div
            key={i}
            className={`${styles.questNode} ${q.isLegendary ? styles.questLegendary : ''}`}
          >
            <div className={styles.questIcon}>{q.icon}</div>
            <div className={styles.questNum}>{q.num}</div>
            <h3 className={styles.questName}>{q.name}</h3>
            <p className={styles.questBody}>{q.body}</p>
            {/* Connector line (not on last) */}
            {i < QUESTS.length - 1 && <div className={styles.questConnector} />}
          </motion.div>
        ))}
      </div>

      <div className={styles.questCta}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          onClick={() => navigate('/game')}
        >
          <span className="btnSymbol">▶</span> BEGIN QUEST
        </motion.button>
      </div>
    </motion.section>
  )
}
