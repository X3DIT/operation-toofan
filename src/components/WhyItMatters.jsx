import styles from './WhyItMatters.module.css'

const stats = [
  { figure: '36,314', label: 'NDPS cases in Kerala (2025)', trend: '+32% from 2024', url: 'https://keralapolice.gov.in/page/ndps-act-cases' },
  { figure: '4,201', label: 'Arrests in first 3 weeks of Op. Toofan', trend: 'since June 2, 2026', url: 'https://keralapolice.gov.in/' },
  { figure: '2,778', label: 'Drug seizures in first fortnight', trend: '₹10 crore+ street value', url: 'https://keralapolice.gov.in/' },
  { figure: '1 in 5', label: 'College students exposed to substances', trend: 'Kerala DEAP survey, 2025', url: 'https://vimukthi.kerala.gov.in/' },
]

export default function WhyItMatters() {
  return (
    <section aria-labelledby="why-heading" className={styles.whySection}>
      <h2 id="why-heading" style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#f0b429' }}>
        Why This Storm Must Rise
      </h2>
      <p style={{ color: '#a0a0b0', maxWidth: '560px', margin: '0 auto 48px', lineHeight: 1.7 }}>
        Kerala recorded its highest-ever narcotics case count in 2025. Operation Toofan launched June 2, 2026 to dismantle these networks. Your pledge is part of that storm.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
        role="list"
      >
        {stats.map((s) => (
          <a
            key={s.figure}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            style={{
              display: 'block',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '20px 16px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0b429', marginBottom: '12px', fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}>
              {s.figure}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#e0e0e0', marginBottom: '4px' }}>
              {s.label}
            </div>
            <div style={{ fontSize: '11px', color: '#787880' }}>{s.trend}</div>
          </a>
        ))}
      </div>
      <p style={{ marginTop: '32px', fontSize: '12px', color: '#606070' }}>
        Sources: Kerala Police Operation Toofan press release, June 2026 · Kerala DEAP Report 2025
      </p>
    </section>
  )
}
