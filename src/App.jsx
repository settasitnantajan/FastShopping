import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import Footer from './page/Footer';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/*  ทำให้ Footer อยู่ด้านล่างสุดเสมอ */}
      <ToastContainer />
      <main className="flex-grow"> {/*  ให้ content หลักขยายเต็มพื้นที่ */}
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App