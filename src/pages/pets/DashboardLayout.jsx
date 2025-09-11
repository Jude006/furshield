import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from '../../components/pets/Sidebar';
import DashboardNav from '../../components/pets/DashboardNav';

const DashboardLayout = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowSideBar(true);
      } else {
        setShowSideBar(false);
      }
    };

    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const closeSideBar = () => {
    if (isMobile) {
      setShowSideBar(false);
    }
  };

  return (
    <section className='flex min-h-screen bg-neutral-50'>
      {!isMobile && showSideBar && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed z-30 hidden h-screen lg:flex"
        >
          <Sidebar setShowSideBar={setShowSideBar} />
        </motion.div>
      )}

      <AnimatePresence>
        {isMobile && showSideBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
            onClick={closeSideBar}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full max-w-full w-80"
            >
              <Sidebar setShowSideBar={setShowSideBar} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`w-full bg-white rounded-xl min-h-screen ${
        !isMobile && showSideBar ? 'lg:ml-80' : 'lg:ml-0'
      } transition-all duration-300`}>
        <DashboardNav setShowSideBar={toggleSideBar} showSideBar={showSideBar} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;