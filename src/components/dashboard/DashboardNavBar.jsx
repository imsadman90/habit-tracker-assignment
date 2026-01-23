// components/DashboardNavbar.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";

const DashboardNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <header
      className="h-16 px-6 flex items-center justify-between 
      bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
      <h2 className="font-semibold text-lg text-slate-700 dark:text-slate-200">
        Dashboard
      </h2>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent transition-all"
          />
          <span className="font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
            {user?.displayName}
          </span>
        </button>

        <div
          className={`absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200/80 dark:border-slate-700 transform origin-top-right transition-all duration-200 ease-out ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Dashboard Home
          </Link>

          <Link
            to="/dashboard/profile"
            className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
