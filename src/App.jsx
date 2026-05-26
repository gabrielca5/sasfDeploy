import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/visao-geral" replace />} />
      <Route path="/dashboard/cadastro/:formId" element={<DashboardPage />} />
      <Route path="/dashboard/:sectionSlug/:actionSlug" element={<DashboardPage />} />
      <Route path="/dashboard/:sectionSlug" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
