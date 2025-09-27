import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './main.css'
import App from './App.jsx'              // user side (HMS)
import NursesApp from './nursesApp.jsx'  // admin/nurse dashboard
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fffcfdff',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* User-facing HMS UI */}
          <Route path="/*" element={<App />} />

          {/* Nurses/Admin Dashboard */}
          <Route path="/nurses/*" element={<NursesApp />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
