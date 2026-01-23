import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import MotionLayout from "../layouts/MotionLayout";
import { Flame, Medal, Star } from "lucide-react";

const HabitDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);

  // ✅ Check if current user is the owner
  const isOwner = user?.email === habit?.created_by;

  useEffect(() => {
    if (location.state?.updated) {
      toast.success("Habit updated successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const fetchHabit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`);
      const data = await res.json();

      setHabit(data.result);

      if (data.result.completionHistory) {
        updateProgressAndStreak(data.result.completionHistory);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch habit data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const updateProgressAndStreak = (completionHistory = []) => {
    const historyDates = completionHistory.map((d) => new Date(d));
    const today = new Date();

    const last30 = historyDates.filter(
      (d) => (today - d) / (1000 * 60 * 60 * 24) <= 30,
    );

    const completedSet = new Set(
      last30.map((d) => d.toISOString().split("T")[0]),
    );

    setProgress(((completedSet.size / 30) * 100).toFixed(1));
    let streakCount = 0;
    let current = new Date();

    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (completedSet.has(dateStr)) {
        streakCount++;
        current.setDate(current.getDate() - 1);
      } else break;
    }

    setStreak(streakCount);
  };

  const handleMarkComplete = async () => {
    if (!habit) return;

    // ✅ Check if user is logged in
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to mark habits as complete.",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location.pathname } });
        }
      });
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];

    if (habit.completionHistory?.includes(todayStr)) {
      Swal.fire({
        icon: "info",
        title: "Already Done!",
        text: "You've already completed this habit today.",
      });
      return;
    }

    try {
      const token = await user.getIdToken(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/habits/${habit._id}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date: todayStr }),
        },
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Habit marked as complete for today!",
        });

        const updated = [...(habit.completionHistory || []), todayStr];
        setHabit((prev) => ({ ...prev, completionHistory: updated }));
        updateProgressAndStreak(updated);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong.",
      });
    }
  };

  const handleDelete = async () => {
    if (!habit) return;

    // ✅ Check ownership before allowing delete
    if (!isOwner) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You can only delete your own habits.",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/habits/${habit._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          Swal.fire("Deleted!", "Your habit has been deleted.", "success");
          navigate("/public-habits");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete habit.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="text-center text-gray-500 mt-20">Habit not found.</div>
    );
  }

  return (
    <MotionLayout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
          <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xl">
            <div className="absolute -top-20 -left-10 w-48 h-48 bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 w-56 h-56 bg-purple-400/20 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10">
              <div className="lg:w-1/2 space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20" />
                  <img
                    src={habit.image}
                    alt={habit.name}
                    className="w-full object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40">
                    {habit.category}
                  </span>

                  {streak >= 30 && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-100 border border-amber-100 dark:border-amber-900/40">
                      <Medal size={18} /> 30-Day Streak
                    </span>
                  )}
                  {streak >= 7 && streak < 30 && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-100 border border-orange-100 dark:border-orange-900/40">
                      <Flame size={18} /> Weekly Streak
                    </span>
                  )}
                  {streak >= 1 && streak < 7 && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100 border border-emerald-100 dark:border-emerald-900/40">
                      <Star size={18} /> Active Streak
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:w-1/2">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
                    Habit
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    {habit.name}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {habit.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Progress (30 days)
                    </p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-semibold text-blue-600 dark:text-blue-300">
                        {progress}%
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40">
                        Auto-tracked
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Current streak
                      </p>
                      <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                        {streak} day{streak !== 1 && "s"}
                      </p>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-200 border border-orange-100 dark:border-orange-900/40 font-semibold">
                      🔥 Keep going
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleMarkComplete}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all"
                  >
                    Mark Complete
                  </button>

                  {isOwner && (
                    <>
                      <Link
                        to={`/update-habit/${habit._id}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                      >
                        Update Habit
                      </Link>

                      <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>

                {user ? (
                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/70 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p>
                      Created by{" "}
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {habit.user_name}
                      </span>
                    </p>
                    <p>{habit.created_by}</p>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/70 text-sm text-slate-500 dark:text-slate-500 text-center">
                    <Link
                      to="/login"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Login
                    </Link>{" "}
                    to see creator information
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionLayout>
  );
};

export default HabitDetails;
