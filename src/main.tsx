import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>

    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: '#0a0a0a',
          color: '#fafafa',
          border: '1px solid #262626',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#0a0a0a',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0a0a0a',
          },
        },
      }}
    />
  </StrictMode>,
)
