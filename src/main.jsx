import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider' // AuthProvider ইমপোর্ট করো

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* পুরো অ্যাপকে AuthProvider দিয়ে ঘিরে দাও */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
    {/* টোস্ট মেসেজ দেখানোর জন্য Toaster */}
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>,
)