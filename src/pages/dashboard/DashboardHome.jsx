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
    h.completionHistory?.includes(today)
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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 shadow hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-3 flex items-center justify-center bg-gradient-to-br ${stat.bg}`}
            >
              {stat.icon}
            </div>
            <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </h4>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow">
        <DashboardCharts data={chartData} />
      </div>

      {/* Mobile friendly note */}
      {habits.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm sm:text-base">
          No habits yet. Start building your streak today!
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
