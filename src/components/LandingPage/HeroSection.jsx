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
      <img src="/assets/toofan-logo.png" alt="Operation Toofan" className={styles.heroLogo} />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
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

            <p
              className={styles.sub}
            >
              Take a 5-minute interactive quest to build your pledge and earn a verifiable certificate.
            </p>

            <div
              className={styles.heroCtas}
            >
              <button
                className="btn-primary"
                onClick={() => navigate('/game')}
              >
                START YOUR PLEDGE QUEST <span className="btnSymbol">▶</span>
              </button>
              <button
                className="btn-ghost"
                onClick={() => navigate('/community')}
              >
                SEE THE COMMUNITY WALL
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Preview Card */}
        <div
          className={styles.heroArt}
        >
          <div className={styles.certificatePreview}>
            <img src="/assets/cert.png" alt="Certificate Preview" className={styles.certImg} />
          </div>
        </div>
      </section>
    </div>
  )
}
