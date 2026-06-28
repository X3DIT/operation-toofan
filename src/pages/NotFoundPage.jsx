import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      background: '#0a0a1a',
      color: '#e0e0e0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }}>
      <div style={{ fontSize: '72px', marginBottom: '24px' }} aria-hidden="true">⚡</div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#f0b429', marginBottom: '12px' }}>
        Lost in the Storm
      </h1>
      <p style={{ fontSize: '16px', color: '#a0a0b0', maxWidth: '400px', lineHeight: 1.6, marginBottom: '28px' }}>
        The shadow claimed this path. The page you seek does not exist — but your oath still awaits.
      </p>
      <Link to="/" style={{
        display: 'inline-block',
        background: '#f0b429',
        color: '#0a0a1a',
        fontWeight: 700,
        padding: '12px 28px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '15px',
        transition: 'opacity 0.2s'
      }}>
        Return to the Order
      </Link>
    </div>
  )
}
