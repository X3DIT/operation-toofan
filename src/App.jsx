import { useState } from 'react'
import './index.css'
import LandingPage from './pages/LandingPage'
import PledgeGame from './pages/PledgeGame'
import CertificatePage from './pages/CertificatePage'
import CommunityWall from './pages/CommunityWall'
import SendPage from './pages/SendPage'
import Nav from './components/Nav'

export default function App() {
  const initialPage = window.location.pathname.includes('/send') ? 'send' : 'landing'
  const [page, setPage] = useState(initialPage)
  const [pledgeData, setPledgeData] = useState(null)

  const navigate = (to, data) => {
    if (data) setPledgeData(data)
    setPage(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <Nav page={page} navigate={navigate} />
      {page === 'landing' && <LandingPage navigate={navigate} />}
      {page === 'game' && <PledgeGame navigate={navigate} />}
      {page === 'certificate' && <CertificatePage data={pledgeData} navigate={navigate} />}
      {page === 'community' && <CommunityWall navigate={navigate} />}
      {page === 'send' && <SendPage />}
    </div>
  )
}
