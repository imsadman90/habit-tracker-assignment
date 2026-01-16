import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import MotionLayout from "../layouts/MotionLayout";
import { Flame, Trophy, TrendingUp, Calendar, User, Mail } from "lucide-react";

// Constants
const API_BASE_URL = "https://habit-server-kappa.vercel.app";
const DAYS_IN_MONTH = 30;
const WEEKLY_STREAK_THRESHOLD = 7;
const MONTHLY_STREAK_THRESHOLD = 30;

const HabitDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (location.state?.updated) {
      toast.success("Habit updated successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const fetchHabit = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await fetch(`VITE_API_URL/habits/${id}`);
      const data = await res.json();
=======
      const res = await fetch(`${API_BASE_URL}/habits/${id}`);
>>>>>>> 2055b98 (polished the project)

      if (!res.ok) {
        throw new Error("Failed to fetch habit");
      }

      const data = await res.json();
      setHabit(data.result);

      if (data.result.completionHistory) {
        updateProgressAndStreak(data.result.completionHistory);
      }
    } catch (err) {
      console.error("Error fetching habit:", err);
      Swal.fire({
        icon: "error",
        title: "Unable to Load Habit",
        text: "We couldn't retrieve the habit details. Please try again.",
        confirmButtonColor: "#3b82f6",
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

    // Calculate progress for last 30 days
    const last30 = historyDates.filter(
<<<<<<< HEAD
      (d) => (today - d) / (1000 * 60 * 60 * 24) <= 30
=======
      (d) => (today - d) / (1000 * 60 * 60 * 24) <= DAYS_IN_MONTH
>>>>>>> 2055b98 (polished the project)
    );

    const completedSet = new Set(
      last30.map((d) => d.toISOString().split("T")[0])
    );

    setProgress(((completedSet.size / DAYS_IN_MONTH) * 100).toFixed(1));

    // Calculate current streak
    let streakCount = 0;
    let current = new Date();

    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (completedSet.has(dateStr)) {
        streakCount++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    setStreak(streakCount);
  };

  const handleMarkComplete = async () => {
    if (!habit) return;

    const todayStr = new Date().toISOString().split("T")[0];

    if (habit.completionHistory?.includes(todayStr)) {
      Swal.fire({
        icon: "info",
        title: "Already Completed",
        text: "You've already marked this habit as complete for today.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    try {
      const token = await user.getIdToken(true);

<<<<<<< HEAD
      const res = await fetch(`VITE_API_URL/habits/${habit._id}/complete`, {
=======
      const res = await fetch(`${API_BASE_URL}/habits/${habit._id}/complete`, {
>>>>>>> 2055b98 (polished the project)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: todayStr }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Excellent Work!",
          text: "Habit completed for today. Keep up the great work!",
          confirmButtonColor: "#10b981",
        });

        const updated = [...(habit.completionHistory || []), todayStr];
        setHabit((prev) => ({ ...prev, completionHistory: updated }));
        updateProgressAndStreak(updated);
      } else {
        throw new Error(data.message || "Failed to mark complete");
      }
    } catch (err) {
      console.error("Error marking complete:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "We couldn't mark your habit as complete. Please try again.",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const handleDelete = async () => {
    if (!habit) return;

    const confirm = await Swal.fire({
      title: "Delete Habit?",
      text: "This action cannot be undone. All progress will be permanently lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken(true);
<<<<<<< HEAD
        const res = await fetch(`VITE_API_URL/habits/${habit._id}`, {
=======
        const res = await fetch(`${API_BASE_URL}/habits/${habit._id}`, {
>>>>>>> 2055b98 (polished the project)
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Your habit has been successfully deleted.",
            confirmButtonColor: "#10b981",
          });
          navigate("/public-habits");
        } else {
          throw new Error("Delete failed");
        }
      } catch (err) {
        console.error("Error deleting habit:", err);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "We couldn't delete the habit. Please try again.",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  const getStreakBadge = () => {
    if (streak >= MONTHLY_STREAK_THRESHOLD) {
      return {
        icon: <Trophy className="w-4 h-4" />,
        label: "30-Day Champion",
        className: "bg-gradient-to-r from-yellow-400 to-amber-500",
      };
    }
    if (streak >= WEEKLY_STREAK_THRESHOLD) {
      return {
        icon: <Flame className="w-4 h-4" />,
        label: "Weekly Warrior",
        className: "bg-gradient-to-r from-orange-500 to-red-500",
      };
    }
    if (streak >= 1) {
      return {
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Active Streak",
        className: "bg-gradient-to-r from-emerald-500 to-green-500",
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
        <p className="text-gray-600 font-medium">Loading habit details...</p>
      </div>
    );
  }

  if (!habit) {
    return (
      <MotionLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-6xl">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800">Habit Not Found</h2>
          <p className="text-gray-600">
            The habit you're looking for doesn't exist.
          </p>
          <Link
            to="/public-habits"
            className="btn btn-primary rounded-full mt-4"
          >
            Browse Habits
          </Link>
        </div>
      </MotionLayout>
    );
  }

  const streakBadge = getStreakBadge();

  return (
    <MotionLayout>
<<<<<<< HEAD
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-10">
        <div
          className="relative shadow-xl rounded-3xl overflow-hidden backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(245,245,255,0.35))",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div className="absolute -top-10 -left-10 w-40 rounded-full bg-pink-300 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40  rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

          <div className="flex flex-col md:flex-row gap-10 p-6 md:p-10">
            <div className="md:w-1/2">
              <img
                src={habit.image}
                alt={habit.name}
                className="w-full object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col justify-between w-full md:w-1/2 space-y-5">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                {habit.name}
              </h1>

              <div className="flex gap-3 flex-wrap">
                <div className="px-4 py-1.5 bg-blue-500/80 text-white rounded-full font-medium shadow">
                  {habit.category}
=======
      <div className=" max-w-7xl mx-auto px-[5%] py-6 md:py-10 lg:py-12">
        {/* Main Card */}
        <div className="relative shadow-2xl rounded-3xl overflow-hidden dark:bg-base-100 bg-gray-100">
          {/* Decorative Background Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>

          <div className="relative flex flex-col lg:flex-row gap-8 p-6 md:p-10">
            {/* Image Section */}
            <div className="lg:w-5/12">
              <div className="relative group">
                <img
                  src={habit.image}
                  alt={habit.name}
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02] dark:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between lg:w-7/12 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {habit.name}
                </h1>

                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded-full font-semibold text-sm shadow-md dark:text-gray-300">
                    {habit.category}
                  </span>

                  {streakBadge && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-2 ${streakBadge.className} text-white rounded-full font-semibold text-sm shadow-md`}
                    >
                      {streakBadge.icon}
                      {streakBadge.label}
                    </span>
                  )}
>>>>>>> 2055b98 (polished the project)
                </div>
              </div>

<<<<<<< HEAD
              <p className="text-gray-700">Description : {habit.description}</p>
=======
              {/* Description */}
              <div className="dark:bg-gray-500 bg-white/50 backdrop-blur-sm rounded-xl p-5  shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 dark:text-gray-300">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                  {habit.description}
                </p>
              </div>
>>>>>>> 2055b98 (polished the project)

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Progress Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-xl p-5 border border-blue-200/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">
                      30-Day Progress
                    </h3>
                  </div>
                  <progress
                    className="progress progress-primary w-full h-3 rounded-full"
                    value={progress}
                    max="100"
                    aria-label={`Progress: ${progress}%`}
                  ></progress>
                  <p className="text-sm mt-2 font-semibold text-blue-700">
                    {progress}% Complete
                  </p>
                </div>

<<<<<<< HEAD
                <div className="flex  items-center gap-2">
                  <p className="font-semibold text-gray-800">
                    Current Streak :
                  </p>
                  <div className="font-semibold">
                    {streak} day{streak !== 1 && "s"}
=======
                {/* Streak Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm rounded-xl p-5 border border-orange-200/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-800">
                      Current Streak
                    </h3>
>>>>>>> 2055b98 (polished the project)
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {streak}
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      day{streak !== 1 && "s"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleMarkComplete}
                  className="btn rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg border-none hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                  aria-label="Mark habit as complete for today"
                >
                  ✓ Mark Complete
                </button>

                {/* Only show Update & Delete if current user is the creator */}
                {user?.email === habit.created_by && (
                  <>
                    <Link
                      to={`/dashboard/update-habit/${habit._id}`}
                      className="btn rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-none hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                      aria-label="Update habit details"
                    >
                      ✏ Update Habit
                    </Link>

                    <button
                      onClick={handleDelete}
                      className="btn rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg border-none hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                      aria-label="Delete this habit"
                    >
                      🗑 Delete
                    </button>
                  </>
                )}
              </div>

              {/* Creator Info */}
              <div className="pt-6 space-y-3 border-t border-gray-300/50">
                <h3 className="dark:text-gray-300 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Creator Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="dark:text-gray-300 font-semibold">
                      {habit.user_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="dark:text-gray-300 text-sm">
                      {habit.created_by}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionLayout>
  );
};

export default HabitDetails;
