import React from 'react'

export default function TrustBanner() {
  return (
    <aside
      aria-label="Official campaign endorsements"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        fontSize: '13px',
        color: '#a0a0b0',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img
          src="/pce-logo.png"
          alt="Providence College of Engineering"
          width={36}
          height={36}
          loading="lazy"
          style={{ borderRadius: '4px' }}
        />
        <span>
          <strong style={{ color: '#e0e0e0', display: 'block', fontSize: '12px' }}>
            Providence College of Engineering
          </strong>
          Kannur, Kerala
        </span>
      </span>

      <span style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true">|</span>

      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            background: '#1a3a5c',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
          aria-hidden="true"
        >
          🛡️
        </span>
        <span>
          <strong style={{ color: '#e0e0e0', display: 'block', fontSize: '12px' }}>
            In association with Kerala Police
          </strong>
          Operation Toofan: The Narco Hunt
        </span>
      </span>

      <span style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true">|</span>

      <a
        href="https://keralapolice.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#78b0f7', textDecoration: 'none', fontSize: '12px' }}
      >
        Kerala Police Official Site ↗
      </a>
    </aside>
  )
}
