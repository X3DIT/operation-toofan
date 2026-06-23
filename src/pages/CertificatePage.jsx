import { useRef, useState } from 'react'
import styles from './CertificatePage.module.css'
import { generateCertificatePDF } from '../utils/generatePDF'

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
      await generateCertificatePDF(data)
    } catch (e) {
      console.error(e)
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

  const valueColors = {
    green: { bg: 'var(--green-50)', color: 'var(--green-800)' },
    purple: { bg: 'var(--purple-50)', color: 'var(--purple-800)' },
    teal: { bg: 'var(--teal-50)', color: 'var(--teal-800)' },
    blue: { bg: '#e6f1fb', color: '#0c447c' },
    amber: { bg: 'var(--amber-50)', color: 'var(--amber-600)' },
    coral: { bg: 'var(--coral-50)', color: 'var(--coral-600)' },
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

        <div className={styles.certCard} ref={certRef} id="certificate">
          <div className={styles.certHeader}>
            <div className={styles.certMark} aria-hidden="true">✦</div>
            <div className={styles.certEyebrow}>Certificate of pledge</div>
            <div className={styles.certIssuer}>Operation Toofan · Drug-free commitment programme</div>
          </div>

          <div className={styles.certBody}>
            <div className={styles.certNameLabel}>This certifies that</div>
            <div className={styles.certName}>{data.name}</div>
            <div className={styles.certDateLine}>on {data.date}</div>

            <div className={styles.certPledge}>
              <div className={styles.certPledgeQuote}>"</div>
              {data.pledgeText}
            </div>

            {data.values.length > 0 && (
              <div className={styles.certValues}>
                {data.values.map(v => (
                  <span
                    key={v.id}
                    className={styles.certValue}
                    style={valueColors[v.color] || valueColors.green}
                  >
                    {v.icon} {v.label}
                  </span>
                ))}
                {data.perfect && (
                  <span className={`${styles.certValue} ${styles.animate_shimmer}`} style={{ background: 'var(--amber-50)', color: 'var(--amber-600)' }}>
                    ✦ Perfect score
                  </span>
                )}
              </div>
            )}
          </div>

          <div className={styles.certFooter}>
            <div className={styles.certSeal}>
              <div className={styles.sealRing}>✦</div>
            </div>
            <div className={styles.certId}>{data.id}</div>
          </div>
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
