import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '8rem 2rem', display: 'flex', justifyContent: 'center' }}>
      <div className="bg-grid-fade" style={{ zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-pixel)', 
          fontSize: 'clamp(2rem, 4vw, 3rem)', 
          color: '#fff', 
          textShadow: '4px 4px 0 #000', 
          marginBottom: '3rem', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          lineHeight: '1.4'
        }}>
          About <span style={{ color: 'var(--primary)' }}>Operation Toofan</span>
        </h1>
        
        <div style={{ 
          background: 'rgba(10, 14, 46, 0.95)', 
          border: '4px solid #000', 
          boxShadow: '8px 8px 0 #000', 
          padding: '3rem 2.5rem', 
          marginBottom: '3rem',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            Operation Toofan is a student-led anti-drug awareness initiative conducted by Providence College of Engineering. 
            The platform aims to encourage young people to make informed, healthy choices through awareness, reflection, and personal commitment.
          </p>
          <p style={{ margin: 0, lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            By transforming a simple pledge into an interactive experience, Operation Toofan seeks to build a stronger, 
            drug-free community where every participant becomes an advocate for positive change.
          </p>
        </div>

        <div style={{ 
          background: 'var(--primary)', 
          border: '4px solid #000', 
          boxShadow: '8px 8px 0 #000', 
          padding: '2rem 2.5rem',
          position: 'relative'
        }}>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.5rem', color: '#000', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Our Mission
          </h2>
          <p style={{ color: '#000', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '500' }}>
            Creating a drug-free generation through awareness, education, and action.
          </p>
          
          <div style={{ 
            marginTop: '2.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            background: '#000', 
            padding: '1rem', 
            color: '#fff', 
            border: '2px solid #000',
            flexWrap: 'wrap'
          }}>
            <div style={{ background: '#fff', padding: '4px', border: '2px solid #000', flexShrink: 0 }}>
              <img src="/assets/logo2.jpg" alt="Providence College" style={{ height: '42px', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                Initiated by
              </div>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', lineHeight: '1.4', wordWrap: 'break-word' }}>
                Providence College of Engineering
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            ← Go to Main Screen
          </button>
        </div>
      </div>
    </div>
  )
}
