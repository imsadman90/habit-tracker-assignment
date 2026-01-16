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

  useEffect(() => {
    if (location.state?.updated) {
      toast.success("Habit updated successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const fetchHabit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`VITE_API_URL/habits/${id}`);
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
      (d) => (today - d) / (1000 * 60 * 60 * 24) <= 30
    );

    const completedSet = new Set(
      last30.map((d) => d.toISOString().split("T")[0])
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

    const todayStr = new Date().toISOString().split("T")[0];

    if (habit.completionHistory?.includes(todayStr)) {
      Swal.fire({
        icon: "info",
        title: "Already Done!",
        text: "You’ve already completed this habit today.",
      });
      return;
    }

    try {
      const token = await user.getIdToken(true);

      const res = await fetch(`VITE_API_URL/habits/${habit._id}/complete`, {
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

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(`VITE_API_URL/habits/${habit._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
                </div>

                {streak >= 30 && (
                  <div className="px-4 py-1.5 bg-yellow-500 text-white rounded-full font-semibold flex items-center gap-1 shadow">
                    <Medal size={18} /> 30-Day Streak
                  </div>
                )}
                {streak >= 7 && streak < 30 && (
                  <div className="px-4 py-1.5 bg-orange-500 text-white rounded-full font-semibold flex items-center gap-1 shadow">
                    <Flame size={18} /> Weekly Streak
                  </div>
                )}
                {streak >= 1 && streak < 7 && (
                  <div className="px-4 py-1.5 bg-green-500 text-white rounded-full font-semibold flex items-center gap-1 shadow">
                    <Star size={18} /> Active Streak
                  </div>
                )}
              </div>

              <p className="text-gray-700">Description : {habit.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    Progress (Last 30 Days)
                  </p>
                  <progress
                    className="progress progress-primary w-full rounded-full"
                    value={progress}
                    max="100"
                  ></progress>
                  <p className="text-sm mt-1 font-medium text-gray-600">
                    {progress}% completed
                  </p>
                </div>

                <div className="flex  items-center gap-2">
                  <p className="font-semibold text-gray-800">
                    Current Streak :
                  </p>
                  <div className="font-semibold">
                    {streak} day{streak !== 1 && "s"}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleMarkComplete}
                  className="btn rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-none hover:opacity-90"
                >
                  Mark Complete
                </button>

                <Link
                  to={`/update-habit/${habit._id}`}
                  className="btn rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-none hover:opacity-90"
                >
                  Update Habit
                </Link>

                <button
                  onClick={handleDelete}
                  className="btn rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg border-none hover:opacity-90"
                >
                  Delete
                </button>
              </div>

              <div className="pt-5 space-y-2 border-t border-gray-300/50 text-sm text-gray-700">
                <p>
                  Created by :{" "}
                  <span className="font-semibold">{habit.user_name}</span>
                </p>
                <p>Email : {habit.created_by}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionLayout>
  );
};

export default HabitDetails;
