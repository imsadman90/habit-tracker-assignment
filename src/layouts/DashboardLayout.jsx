import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar onClose={() => {}} /> {/* ✅ Empty function for desktop */}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden" // ✅ Added visible background
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`} // Changed z-index to 50 (above overlay)
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />{" "}
        {/* Pass close function */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 h-16 px-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 dark:text-gray-300 text-2xl"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">
            Dashboard
          </span>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <DashboardNavbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
