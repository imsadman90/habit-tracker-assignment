import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router";
import MotionLayout from "../layouts/MotionLayout";

const MyHabits = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`VITE_API_URL/my-habits?email=${user.email}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch your habits.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user, refresh]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(`VITE_API_URL/habits/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setHabits(habits.filter((habit) => habit._id !== id));
          toast.success("Habit deleted!");
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to delete habit.",
        });
      }
    }
  };

  const calculateStreak = (completionHistory = []) => {
    if (!completionHistory.length) return 0;
    const completedDates = completionHistory
      .map((d) => new Date(d).toISOString().split("T")[0])
      .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let current = new Date();
    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (completedDates.includes(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else break;
    }
    return streak;
  };

  const handleMarkComplete = async (habit) => {
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
          authorization: `Bearer ${token}`,
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

        setHabits((prev) =>
          prev.map((h) =>
            h._id === habit._id
              ? {
                  ...h,
                  completionHistory: [...(h.completionHistory || []), todayStr],
                }
              : h
          )
        );
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );

  return (
    <MotionLayout>
      <div className="px-6 mt-5 overflow-x-auto">
        {habits.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-2xl">
            No habits added yet
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th className="w-1/4">Title</th>
                <th className="w-1/4">Category</th>
                <th className="w-1/6">Current Streak</th>
                <th className="w-1/6">Created Date</th>
                <th className="w-auto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id}>
                  <td>{habit.name}</td>
                  <td>{habit.category}</td>
                  <td>{calculateStreak(habit.completionHistory)}</td>
                  <td>{new Date(habit.created_at).toLocaleDateString()}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    <Link
                      to={`/update-habit/${habit._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(habit._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleMarkComplete(habit)}
                    >
                      {habit.completionHistory?.includes(
                        new Date().toISOString().split("T")[0]
                      )
                        ? "Completed"
                        : "Mark Complete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MotionLayout>
  );
};

export default MyHabits;
