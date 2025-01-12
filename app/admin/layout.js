'use client';

import { useState } from 'react';
import Header from '../_components/Header/Header';
import Sidebar from '../_components/Sidebar';

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`md:static md:translate-x-0 md:w-[15rem] lg:w-[20rem] fixed top-18 left-0 h-full w-[18rem] bg-primary-950 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:flex md:flex-col overflow-y-auto transition-transform duration-300 z-50 `}
        >
          <Sidebar />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 md:hidden z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
