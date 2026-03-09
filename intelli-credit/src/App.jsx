import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import DataIngestion from './pages/DataIngestion'
import ResearchAgent from './pages/ResearchAgent'
import RecommendationEngine from './pages/RecommendationEngine'
import CAMReport from './pages/CAMReport'
import ApplicationTracker from './pages/ApplicationTracker'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const pages = {
    dashboard: { title: 'Command Center', subtitle: 'AI Credit Intelligence Overview', component: Dashboard },
    ingestion: { title: 'Data Ingestion Module', subtitle: 'Upload and process financial documents', component: DataIngestion },
    research: { title: 'Research Agent', subtitle: 'Automated secondary research & intelligence', component: ResearchAgent },
    recommendation: { title: 'Recommendation Engine', subtitle: 'ML-powered credit scoring & decision', component: RecommendationEngine },
    cam: { title: 'CAM Report Generator', subtitle: 'Credit Appraisal Memo generation', component: CAMReport },
    tracker: { title: 'Application Tracker', subtitle: 'Monitor all credit applications', component: ApplicationTracker },
  }

  const current = pages[currentPage] || pages.dashboard
  const PageComponent = current.component

  return (
    <Router>
      <div className="app-layout">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="main-content">
          <Header title={current.title} subtitle={current.subtitle} />
          <div className="page-content animate-fade-in">
            <PageComponent setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
