export default function PrivacyPage() {
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
          lineHeight: '1.2'
        }}>
          Privacy <span style={{ color: 'var(--primary)' }}>Policy</span>
        </h1>
        <div style={{ 
          background: 'rgba(10, 14, 46, 0.95)', 
          border: '4px solid #000', 
          boxShadow: '8px 8px 0 #000', 
          padding: '3rem 2.5rem',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            Your privacy is important to us. Operation Toofan does not collect personally identifiable information 
            unless explicitly provided by you during the pledge process.
          </p>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            Any data collected (such as your name for the certificate) is used solely for the purpose of generating 
            your personalized pledge certificate and displaying it on the community wall.
          </p>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            We do not sell, trade, or otherwise transfer your personal information to outside parties. 
            All pledge data is stored securely and used only to power the core features of the Operation Toofan platform.
          </p>
          <p style={{ margin: 0, lineHeight: '1.8', color: '#ccc', fontSize: '1.1rem' }}>
            If you have any questions or concerns about how your data is handled, please contact the organizers at Providence College of Engineering.
          </p>
        </div>
      </div>
    </div>
  )
}
