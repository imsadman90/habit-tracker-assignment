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
    <div className="navbar shadow-sm bg-[#b9e2f5] sticky top-0 z-50 px-4 md:px-10">
      
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56 space-y-1"
          >
            {navLinks}
          </ul>
        </div>

        <Link
          to="/"
          className="flex justify-center items-center gap-3 text-lg md:text-xl font-bold text-blue-600"
        >
          <img
            className="w-[38px] h-[38px] md:w-[40px] md:h-[40px] rounded-full"
            src="/mainlogo.png"
            alt=""
          />
          <h1 className="hidden md:block">Habit Tracker</h1>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

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
              className="menu menu-sm dropdown-content mt-2 p-3 shadow bg-base-100 rounded-box w-56"
            >
              <li className="pb-2">
                <span className="font-semibold">{user.displayName}</span>
                <span className="text-xs">{user.email}</span>
              </li>

              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-error rounded-full"
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
              className="btn btn-primary border-none rounded-full text-sm md:text-base"
            >
              <IoLogIn /> Login
            </Link>

            <Link
              to="/register"
              className="btn btn-success border-none rounded-full text-sm md:text-base"
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
