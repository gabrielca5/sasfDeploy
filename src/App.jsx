import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DashboardLayout from './components/DashboardLayout'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/perfil" element={<DashboardLayout sectionSlug="perfil" />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/visao-geral" replace />} />
      <Route path="/dashboard/cadastro/formulario/:formId" element={<DashboardPage />} />
      <Route path="/dashboard/:sectionSlug/:actionSlug" element={<DashboardPage />} />
      <Route path="/dashboard/:sectionSlug" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
