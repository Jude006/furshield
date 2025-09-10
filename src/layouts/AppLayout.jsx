import React from 'react'
import Header from '../components/common/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/common/Footer'

const AppLayout = () => {
    const hideNavbar = ['/auth/login', '/auth/signup', '/pets-dashboard' , '/vet-dashboard']
  const location = useLocation()
  const shouldHideNavbar = hideNavbar.some(route => location.pathname.startsWith(route))
  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
    {!shouldHideNavbar &&  <Footer />}
    </div>
  )
}

export default AppLayout