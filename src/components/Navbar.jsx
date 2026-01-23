import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { IoMenu, IoClose } from "react-icons/io5";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:-bottom-1 after:rounded-t-lg"
      : "text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300";

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <Link
          to="/#about"
          className="text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300"
        >
          About
        </Link>
      </li>
      <li>
        <NavLink
          to="/#contact"
          className="text-slate-700 dark:text-slate-300 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300"
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li>
        <NavLink to="/dashboard" className={navStyle}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-habit" className={navStyle}>
          Add Habit
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-habits" className={navStyle}>
          My Habits
        </NavLink>
      </li>
      <li>
        <NavLink to="/public-habits" className={navStyle}>
          Explore Habits
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={navStyle}>
          Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div
        className="navbar max-w-7xl mx-auto px-4 md:px-10 py-2
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl
        text-slate-800 dark:text-slate-200
        shadow-lg shadow-blue-500/10 dark:shadow-blue-900/10
        border-b border-blue-100 dark:border-blue-900/20
        transition-all duration-300"
      >
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="btn btn-ghost btn-circle text-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 ml-2 lg:ml-0 hover:opacity-90 transition-opacity duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-110 group">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-lg md:text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-500">
              Habit Tracker
            </h1>
          </Link>
        </div>

        {/* CENTER - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2 md:gap-4">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-label="User menu"
                className="btn btn-ghost btn-circle avatar hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <div className="w-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 hover:border-purple-500 transition-colors overflow-hidden">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User avatar"
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  />
                </div>
              </button>

              <div
                className={`absolute right-0 mt-3 w-64 rounded-2xl border border-blue-100 dark:border-blue-900/20 shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg p-2 space-y-1 transform origin-top-right transition-all duration-200 ease-out ${
                  isUserMenuOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="pb-2 border-b border-blue-100 dark:border-blue-900/20">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {user.displayName}
                  </span>
                  <span className="text-xs opacity-60">{user.email}</span>
                </div>

                <NavLink
                  to="/dashboard/profile"
                  className="block px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="block px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={signOutUser}
                  className="w-full text-left px-3 py-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all"
                >
                  <IoLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm md:btn-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <IoLogIn className="text-lg" /> Login
              </Link>

              <Link
                to="/register"
                className="btn btn-sm md:btn-md bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-b border-blue-100 dark:border-blue-900/20">
          <ul className="menu menu-compact w-full px-4 py-3 space-y-2">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
