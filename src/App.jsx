import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import InvitePage from './pages/InvitePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invite/:slug" element={<InvitePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Redirect root to a demo invite or 404 for now, let's just go to dashboard for dev */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
