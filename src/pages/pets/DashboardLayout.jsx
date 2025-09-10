import React from 'react'
import Sidebar from '../../components/pets/Sidebar'
import DashboardNav from '../../components/pets/DashboardNav'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <main>
      <DashboardNav />
      <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
