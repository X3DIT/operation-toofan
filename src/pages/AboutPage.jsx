export default function AboutPage() {
  return (
    <div style={{ padding: '8rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>About Operation Toofan</h1>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        Operation Toofan is a student-led anti-drug awareness initiative conducted by Providence College of Engineering. 
        The platform aims to encourage young people to make informed, healthy choices through awareness, reflection, and personal commitment.
      </p>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        By transforming a simple pledge into an interactive experience, Operation Toofan seeks to build a stronger, 
        drug-free community where every participant becomes an advocate for positive change.
      </p>
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Our Mission</h3>
        <p style={{ color: 'var(--text-muted)' }}>Creating a drug-free generation through awareness, education, and action.</p>
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/assests/logo2.jpg" alt="Providence College" style={{ height: '50px', borderRadius: '8px' }} />
          <div>
            <div style={{ fontSize: '14px', color: 'var(--text-hint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Initiated by</div>
            <div style={{ fontWeight: '500' }}>Providence College of Engineering</div>
          </div>
        </div>
      </div>
    </div>
  )
}
