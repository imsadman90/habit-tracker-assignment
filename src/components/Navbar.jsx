import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoLogIn, IoLogOut } from "react-icons/io5";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary"
      : "hover:text-primary transition";

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <Link to="/#about" className="hover:text-primary transition">
          About
        </Link>
      </li>
      <li>
        <NavLink to="/#contact" className="hover:text-primary transition">
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
    <header className="sticky top-0 z-50">
      <div
        className="navbar max-w-7xl mx-auto px-4 md:px-10
        bg-white dark:bg-slate-900
        text-slate-800 dark:text-slate-200
        shadow-sm"
      >
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              aria-label="Open menu"
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow
                bg-base-100 dark:bg-slate-800
                rounded-box w-56 space-y-1"
            >
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white text-xl">📊</span>
            </div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Habit Tracker
            </h1>
          </div>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                aria-label="User menu"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full border">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User avatar"
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 p-3 shadow
                  bg-base-100 dark:bg-slate-800
                  rounded-box w-56"
              >
                <li className="pb-2 border-b">
                  <span className="font-semibold">{user.displayName}</span>
                  <span className="text-xs opacity-70">{user.email}</span>
                </li>

                <li>
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button
                    onClick={signOutUser}
                    className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary rounded-full text-sm md:text-base"
              >
                <IoLogIn /> Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline rounded-full text-sm md:text-base"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
