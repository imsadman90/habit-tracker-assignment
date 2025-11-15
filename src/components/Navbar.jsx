import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, NavLink } from "react-router";
import { IoLogIn, IoLogOut } from "react-icons/io5";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-habit"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Add Habit
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-habits"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          My Habits
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/public-habits"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
          }
        >
          Browse Public Habits
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm bg-[#b9e2f5] sticky top-0 z-50">
      <div className="navbar-start">
        {/* mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-blue-600"
        >
          <img className=" w-[30px] h-[30px]" src="/public/logo1.png" alt="" />
          <h1>Habit Tracker</h1>
        </Link>
      </div>

      {/* desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* right side */}
      <div className="navbar-end flex gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full border">
                <img
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="pb-2 border-b">
                <span className="font-semibold">{user.displayName}</span>
                <span className="text-xs">{user.email}</span>
              </li>
              <li>
                <button
                  onClick={signOutUser}
                  className="bg-[#84cdee] text-black"
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
              className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              <IoLogIn /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
