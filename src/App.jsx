import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DashboardLayout from './components/DashboardLayout'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import CalendarioCallbackPage from './pages/CalendarioCallbackPage'

const ADMIN_GESTOR = ['ADMIN', 'GESTOR']

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route
          path="/calendario/callback"
          element={
            <ProtectedRoute>
              <CalendarioCallbackPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <DashboardLayout sectionSlug="perfil" />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Navigate to="/dashboard/visao-geral" replace />} />
        <Route
          path="/dashboard/cadastro/formulario/:formId"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/usuarios"
          element={
            <ProtectedRoute allowedRoles={ADMIN_GESTOR}>
              <DashboardLayout sectionSlug="usuarios" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:sectionSlug/:actionSlug"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:sectionSlug"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
