import { useEffect, useState, useContext } from "react";
import { FaList, FaCheckCircle, FaFire } from "react-icons/fa";
import DashboardCharts from "../../components/DashboardCharts";
import { AuthContext } from "../../Context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [habits, setHabits] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/my-habits?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        generateChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, [user]);

  const generateChartData = (habits) => {
    const daysMap = {};
    habits.forEach((habit) => {
      habit.completionHistory?.forEach((date) => {
        daysMap[date] = (daysMap[date] || 0) + 1;
      });
    });

    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().split("T")[0];
      return {
        name: d.toLocaleDateString("en-US", { weekday: "short" }),
        completed: daysMap[key] || 0,
      };
    });

    setChartData(last7Days);
  };

  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter((h) =>
    h.completionHistory?.includes(today),
  ).length;

  const stats = [
    {
      title: "Total Habits",
      value: habits.length,
      icon: <FaList className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      bg: "from-blue-500 to-blue-700",
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      bg: "from-green-500 to-green-700",
    },
    {
      title: "Active Days",
      value: chartData.reduce((a, b) => a + b.completed, 0),
      icon: <FaFire className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      bg: "from-orange-500 to-red-600",
    },
  ];

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
              Dashboard
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back{user?.displayName ? `, ${user.displayName}` : "!"}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-3 py-1 backdrop-blur">
                <FaFire className="text-orange-500" />
                {chartData.reduce((a, b) => a + b.completed, 0)} active days
                this week
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/80 dark:bg-blue-900/20 px-3 py-1 text-blue-700 dark:text-blue-200">
                <FaCheckCircle />
                {completedToday} done today
              </span>
            </div>
          </div>
          <div className="self-start rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 px-4 py-3 shadow-sm backdrop-blur">
            <p className="text-xs text-slate-500 dark:text-slate-400">Today</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-slate-50/80 via-white/50 to-blue-50/60 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-blue-900/40" />
              <div className="relative p-5 sm:p-6 flex items-center gap-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.bg} shadow-lg shadow-blue-500/20`}
                >
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/70 backdrop-blur-lg shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Progress overview
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Completions over the last 7 days
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-100/80 dark:border-blue-900/40">
              Live sync
            </span>
          </div>
          <div className="p-4 sm:p-6">
            <DashboardCharts data={chartData} />
          </div>
        </div>

        {/* Mobile friendly note */}
        {habits.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6">
            No habits yet. Start building your streak today!
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
