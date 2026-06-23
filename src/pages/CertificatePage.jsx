import { useRef, useState } from 'react'
import styles from './CertificatePage.module.css'
import { generateCertificatePDF } from '../utils/generatePDF'
import CertificateTemplate from '../components/CertificateTemplate'

export default function CertificatePage({ data, navigate }) {
  const certRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!data) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p>No pledge data found.</p>
        <button onClick={() => navigate('game')} style={{ marginTop: '1rem', padding: '10px 24px', background: 'var(--green-600)', color: '#fff', borderRadius: 'var(--radius-pill)' }}>
          Take the pledge
        </button>
      </div>
    )
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const element = certRef.current
      if (!element) throw new Error('Certificate element not found')
      await generateCertificatePDF(data, element)
    } catch (e) {
      console.error('PDF generation failed:', e)
    }
    setDownloading(false)
  }

  const handleShare = async () => {
    const text = `I just took the drug-free pledge! "${data.pledgeText}" — Join me at Operation Toofan.`
    if (navigator.share) {
      await navigator.share({ title: 'My drug-free pledge', text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.congrats}>
            <span className={styles.confetti} aria-hidden="true">✦</span>
            Pledge complete
          </div>
          <h1 className={styles.title}>Your certificate is ready</h1>
          <p>You earned {data.xp} XP · {data.score}/3 questions correct{data.perfect ? ' · Perfect score ✦' : ''}</p>
        </div>

        {/* ── Certificate preview (captured for PDF) ── */}
        <div style={{ overflow: 'auto', maxWidth: '100%', marginBottom: '2rem' }}>
          <CertificateTemplate ref={certRef} data={data} />
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Generating PDF…' : '⬇ Download certificate'}
          </button>
          <button className={styles.secondaryBtn} onClick={handleShare}>
            {copied ? '✓ Copied to clipboard' : '⬆ Share my pledge'}
          </button>
        </div>

        <div className={styles.next}>
          <button className={styles.ghostLink} onClick={() => navigate('community')}>
            See the community wall →
          </button>
          <button className={styles.ghostLink} onClick={() => navigate('game')}>
            Restart quest
          </button>
        </div>

        <div className={styles.resources}>
          <div className={styles.resourcesTitle}>Helpful resources</div>
          <div className={styles.resourceGrid}>
            <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener" className={styles.resourceCard}>
              <div className={styles.resourceIcon}>◉</div>
              <div>
                <div className={styles.resourceName}>SAMHSA Helpline</div>
                <div className={styles.resourceDesc}>Free, confidential, 24/7 treatment referral</div>
              </div>
            </a>
            <a href="https://www.nida.nih.gov" target="_blank" rel="noopener" className={styles.resourceCard}>
              <div className={styles.resourceIcon}>◎</div>
              <div>
                <div className={styles.resourceName}>NIDA</div>
                <div className={styles.resourceDesc}>Science-based drug information</div>
              </div>
            </a>
            <a href="https://www.drugfree.org" target="_blank" rel="noopener" className={styles.resourceCard}>
              <div className={styles.resourceIcon}>◈</div>
              <div>
                <div className={styles.resourceName}>Partnership to End Addiction</div>
                <div className={styles.resourceDesc}>Support for families</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
