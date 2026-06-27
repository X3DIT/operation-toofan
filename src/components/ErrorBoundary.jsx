import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[Operation Toofan] Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ background:'#0a0a1a', color:'#e0e0e0', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'24px' }}>
          <span aria-hidden="true" style={{ fontSize:'48px', marginBottom:'16px' }}>⚡</span>
          <h1 style={{ color:'#f0b429', fontSize:'24px', marginBottom:'12px' }}>The Storm Disrupted</h1>
          <p style={{ color:'#a0a0b0', maxWidth:'400px', marginBottom:'24px', lineHeight:1.6 }}>
            An unexpected error struck. The shadow shall not win — refresh the page to continue your quest.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background:'#f0b429', color:'#0a0a1a', border:'none', borderRadius:'8px', padding:'12px 28px', fontWeight:700, fontSize:'15px', cursor:'pointer' }}
          >
            Refresh Page
          </button>
        </main>
      )
    }
    return this.props.children
  }
}
