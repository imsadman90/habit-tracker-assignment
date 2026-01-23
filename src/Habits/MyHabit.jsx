import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router";
import MotionLayout from "../layouts/MotionLayout";
import {
  FaFire,
  FaCheckCircle,
  FaTrashAlt,
  FaEdit,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";

const MyHabits = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchHabits = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${API_URL}/my-habits?email=${user.email}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch habits");
      const data = await res.json();
      setHabits(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load your habits", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user, refresh]);

  const calculateCurrentStreak = (completionHistory = []) => {
    if (!completionHistory?.length) return 0;
    const sortedDates = [...completionHistory]
      .map((d) => new Date(d).toISOString().split("T")[0])
      .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let current = new Date();
    const today = current.toISOString().split("T")[0];

    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (sortedDates.includes(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        if (dateStr === today) break;
        if (new Date(dateStr) > new Date(today)) {
          current.setDate(current.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return streak;
  };

  const isCompletedToday = (history = []) => {
    const today = new Date().toISOString().split("T")[0];
    return history.includes(today);
  };

  const handleMarkComplete = async (habit) => {
    if (isCompletedToday(habit.completionHistory)) {
      toast("Already completed today! 🎉", { icon: "✨", duration: 3000 });
      return;
    }

    try {
      const token = await user.getIdToken(true);
      const todayStr = new Date().toISOString().split("T")[0];

      const res = await fetch(`${API_URL}/habits/${habit._id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: todayStr }),
      });

      if (!res.ok) throw new Error("Failed to mark complete");

      setHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id
            ? {
                ...h,
                completionHistory: [...(h.completionHistory || []), todayStr],
              }
            : h,
        ),
      );

      toast.success("Great job! Keep it up! 🔥", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't mark as complete");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete habit?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(`${API_URL}/habits/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setHabits(habits.filter((habit) => habit._id !== id));
          toast.success("Habit deleted successfully");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete habit");
      }
    }
  };

  if (loading) {
    return (
      <MotionLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-ring loading-lg text-indigo-500"></span>
            <p className="text-slate-500 dark:text-slate-400">
              Loading your habits...
            </p>
          </div>
        </div>
      </MotionLayout>
    );
  }

  return (
    <MotionLayout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
                Dashboard
              </p>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                My Habits
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 px-3 py-1 backdrop-blur">
                  <FaFire className="text-orange-500" />
                  {habits.length} active habits
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 px-3 py-1">
                  <FaCheckCircle className="text-emerald-500" />
                  Stay consistent daily
                </span>
              </div>
            </div>

            <Link
              to="/dashboard/add-habit"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <FaPlus size={16} /> New Habit
            </Link>
          </div>

          {habits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm text-center py-16 px-6">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl mb-2">🌱</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  No habits yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Start your journey to better habits today!
                </p>
                <Link
                  to="/dashboard/add-habit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                >
                  <FaPlus /> Create First Habit
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl">
              <div className="overflow-x-auto">
                <table className="table table-lg w-full">
                  <thead className="bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-purple-950/40">
                    <tr className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100">
                      <th className="w-5/12">Habit</th>
                      <th className="w-2/12 text-center">Category</th>
                      <th className="w-1/12 text-center">Streak</th>
                      <th className="w-2/12 text-center">Created</th>
                      <th className="w-3/12 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {habits.map((habit) => {
                      const streak = calculateCurrentStreak(
                        habit.completionHistory,
                      );
                      const completedToday = isCompletedToday(
                        habit.completionHistory,
                      );

                      return (
                        <tr
                          key={habit._id}
                          className="border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <td className="font-medium">
                            <div className="flex flex-col gap-1">
                              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                                {habit.name}
                              </div>
                              {habit.description && (
                                <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                  {habit.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-sm bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300">
                              {habit.category}
                            </div>
                          </td>
                          <td className="text-center">
                            <div
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm ${
                                streak > 0
                                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-sm"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              <FaFire
                                className={
                                  streak > 0 ? "text-white" : "text-slate-400"
                                }
                              />
                              {streak}
                            </div>
                          </td>
                          <td className="text-center text-slate-600 dark:text-slate-400">
                            <div className="flex items-center justify-center gap-2">
                              <FaCalendarAlt className="text-indigo-500" />
                              {new Date(habit.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="text-right pr-6">
                            <div className="flex items-center justify-end gap-2 flex-nowrap overflow-x-auto whitespace-nowrap pb-2">
                              {completedToday ? (
                                <div className="btn btn-sm btn-outline btn-success gap-1.5 inline-flex items-center">
                                  <FaCheckCircle /> Completed
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleMarkComplete(habit)}
                                  className="btn btn-sm btn-outline btn-success gap-1.5 inline-flex items-center hover:bg-success hover:text-white transition-colors"
                                >
                                  <FaCheckCircle /> Complete
                                </button>
                              )}
                              <Link
                                to={`/dashboard/update-habit/${habit._id}`}
                                className="btn btn-sm btn-outline btn-info gap-1.5 inline-flex items-center"
                              >
                                <FaEdit /> Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(habit._id)}
                                className="btn btn-sm btn-outline btn-error gap-1.5 inline-flex items-center"
                              >
                                <FaTrashAlt /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </MotionLayout>
  );
};

export default MyHabits;
