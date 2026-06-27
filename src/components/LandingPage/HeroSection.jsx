import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTypewriter } from '../../hooks/useTypewriter'
import styles from '../../pages/LandingPage.module.css'

export default function HeroSection() {
  const navigate = useNavigate();
  useTypewriter('THE STORM IS RISING.', 70)

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.parallaxBg}>
        <video 
          src="/assets/Elements/0pixelated%20video%20bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`${styles.bgVideo} ${styles.desktopVideo}`} 
        />
        <video 
          src="/assets/Elements/0pixelated%20video%20bg%20mob.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`${styles.bgVideo} ${styles.mobileVideo}`} 
        />
      </div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.eyebrowWrapper}>
              <div className={styles.eyebrow}>
                YOUR COMMITMENT, MADE REAL
              </div>
            </div>

            <h1 className={styles.headline}>
              PLEDGE FOR A<br />
              DRUG-FREE<br />
              <span>FUTURE.</span>
            </h1>

            <motion.p
              className={styles.sub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Take a 5-minute interactive quest to build your pledge and earn a verifiable certificate.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => navigate('/game')}
              >
                START YOUR PLEDGE QUEST <span className="btnSymbol">▶</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost"
                onClick={() => navigate('/community')}
              >
                SEE THE COMMUNITY WALL
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Certificate Preview Card */}
        <motion.div
          className={styles.heroArt}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.certificatePreview}>
            <img src="/assets/cert.png" alt="Certificate Preview" className={styles.certImg} />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
