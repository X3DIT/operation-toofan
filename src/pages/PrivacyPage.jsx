export default function PrivacyPage() {
  return (
    <div style={{ padding: '8rem 2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <div className="bg-grid-fade" />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        Your privacy is important to us. Operation Toofan does not collect personally identifiable information 
        unless explicitly provided by you during the pledge process.
      </p>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        Any data collected (such as your name for the certificate) is used solely for the purpose of generating 
        your personalized pledge certificate and displaying it on the community wall.
      </p>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        We do not sell, trade, or otherwise transfer your personal information to outside parties. 
        All pledge data is stored securely and used only to power the core features of the Operation Toofan platform.
      </p>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        If you have any questions or concerns about how your data is handled, please contact the organizers at Providence College of Engineering.
      </p>
    </div>
  )
}
