// components/DashboardNavbar.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";

const DashboardNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3"
        >
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
            {user?.displayName}
          </span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 
            rounded-xl shadow-xl overflow-hidden border dark:border-slate-700"
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
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;