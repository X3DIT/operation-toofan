const stats = [
  { figure: '36,314', label: 'NDPS cases in Kerala (2025)', trend: '+32% from 2024' },
  { figure: '4,201', label: 'Arrests in first 3 weeks of Op. Toofan', trend: 'since June 2, 2026' },
  { figure: '2,778', label: 'Drug seizures in first fortnight', trend: '₹10 crore+ street value' },
  { figure: '1 in 5', label: 'College students exposed to substances', trend: 'Kerala DEAP survey, 2025' },
]

export default function WhyItMatters() {
  return (
    <section aria-labelledby="why-heading" style={{ padding: '64px 24px', textAlign: 'center' }}>
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
          <div
            key={s.figure}
            role="listitem"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '20px 16px',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#f0b429', marginBottom: '8px' }}>
              {s.figure}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#e0e0e0', marginBottom: '4px' }}>
              {s.label}
            </div>
            <div style={{ fontSize: '11px', color: '#787880' }}>{s.trend}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '32px', fontSize: '12px', color: '#606070' }}>
        Sources: Kerala Police Operation Toofan press release, June 2026 · Kerala DEAP Report 2025
      </p>
    </section>
  )
}
