import { NavLink } from "react-router-dom";

const navConfig = [
  {
    section: "main",
    title: "Main Menu",
    items: [
      { id: "overview", label: "Overview", icon: "📊", path: "/dashboard" },
      {
        id: "add-habit",
        label: "Add Habit",
        icon: "➕",
        path: "/dashboard/add-habit",
      },
      {
        id: "my-habits",
        label: "My Habits",
        icon: "📝",
        path: "/dashboard/my-habits",
      },
    ],
  },
  {
    section: "account",
    title: "Account",
    items: [
      {
        id: "profile",
        label: "Profile",
        icon: "👤",
        path: "/dashboard/profile",
      },
    ],
  },
];

const NavIcon = ({ icon, active }) => (
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all ${
      active
        ? "bg-white/20 shadow-inner"
        : "bg-white/10 border border-white/10 group-hover:border-white/20"
    }`}
  >
    {icon}
  </div>
);

const Sidebar = ({ onClose }) => {
  return (
    <aside className="w-72 flex flex-col bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/70 dark:border-slate-800 shadow-xl overflow-y-auto h-full">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-200/60 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg
              className="w-5 h-5 text-white"
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
          <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Habit Tracker
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
        {navConfig.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-3">
              {section.title}
            </p>

            {section.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.id === "overview"}
                onClick={onClose} // ✅ Close sidebar on click
              >
                {({ isActive }) => (
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-slate-800/70 border border-transparent hover:border-blue-100/60 dark:hover:border-blue-900/40"
                    }`}
                  >
                    <NavIcon icon={item.icon} active={isActive} />
                    <span className="font-medium tracking-tight">
                      {item.label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-3 border-t border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
        <NavLink
          to="/"
          onClick={onClose} // ✅ Close sidebar on click
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
        >
          <span className="text-lg">🏠</span>
          <span>Back to Home</span>
        </NavLink>

        <div className="text-xs text-center text-slate-500 pt-2">
          © {new Date().getFullYear()} Habit Tracker
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
