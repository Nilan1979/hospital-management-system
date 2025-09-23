import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import AppointmentsPage from './pages/AppointmentsPage'
import TreatmentPage from './pages/TreatmentPage'
import UserPage from './pages/UserPage'
import InventoryPage from './pages/InventoryPage'
import PharmacyPage from './pages/PharmacyPage'
import ReportsPage from './pages/ReportsPage'
import ProtectedRoute from './components/ProtectedRoute'
import { ROUTES } from './constants/app'

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.DASHBOARD} element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PATIENTS} element={
            <ProtectedRoute>
              <PatientsPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.APPOINTMENTS} element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.TREATMENT} element={
            <ProtectedRoute>
              <TreatmentPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.USER} element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.INVENTORY} element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PHARMACY} element={
            <ProtectedRoute>
              <PharmacyPage />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.REPORTS} element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </Box>
  )
}

export default App
