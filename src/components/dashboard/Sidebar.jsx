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
    className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-colors ${
      active
        ? "bg-white/20"
        : "bg-blue-50 dark:bg-slate-800/50 group-hover:bg-blue-100 dark:group-hover:bg-slate-700"
    }`}
  >
    {icon}
  </div>
);

// ✅ Added onClose prop
const Sidebar = ({ onClose }) => {
  return (
    <aside className="h-screen w-72 flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white text-xl">📊</span>
          </div>
          <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Habit Tracker
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
        {navConfig.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
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
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md"
                    }`}
                  >
                    <NavIcon icon={item.icon} active={isActive} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <NavLink
          to="/"
          onClick={onClose} // ✅ Close sidebar on click
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
        >
          <span className="text-lg">🏠</span>
          <span>Back to Home</span>
        </NavLink>

        <div className="text-xs text-center text-gray-500 pt-2">
          © {new Date().getFullYear()} Habit Tracker
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
