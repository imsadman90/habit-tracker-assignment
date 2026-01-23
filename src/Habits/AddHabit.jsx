import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import MotionLayout from "../layouts/MotionLayout";
import {
  FaPlus,
  FaClock,
  FaImage,
  FaStickyNote,
  FaTag,
  FaUser,
} from "react-icons/fa";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const formData = {
      name: form.name.value.trim(),
      category: form.category.value,
      description: form.description.value.trim(),
      image: form.image.value.trim() || null,
      reminder_time: form.reminder.value,
      created_by: user.email,
      user_name: user.displayName || "Anonymous",
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add habit");

      toast.success("Great! New habit created! 🚀", {
        duration: 3000,
        position: "top-center",
      });

      form.reset();
      form.category.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionLayout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col gap-3 mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
              New Habit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Add a habit you want to grow
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Keep it specific, set a reminder, and make it part of your daily
              rhythm.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-6 md:px-10 py-6 border-b border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/60 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-indigo-950/30">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 via-blue-500 to-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                  <FaPlus size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Create new habit
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Capture the essentials to stay consistent.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700 px-3 py-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
                  <FaClock className="text-amber-500" />
                  Quick setup
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-900/50 px-3 py-1 bg-blue-50/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200">
                  <FaUser className="text-blue-500" />
                  {user?.email || "Signed in"}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-7">
              {/* Name + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <FaStickyNote className="text-blue-500" />
                    Habit Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={60}
                    placeholder="e.g. Morning meditation"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <FaTag className="text-indigo-500" />
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all duration-200 text-slate-700 dark:text-slate-200"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Morning">🌅 Morning</option>
                    <option value="Work">💼 Work</option>
                    <option value="Fitness">🏋️ Fitness</option>
                    <option value="Evening">🌙 Evening</option>
                    <option value="Study">📚 Study</option>
                    <option value="Mindfulness">🧘 Mindfulness</option>
                    <option value="Health">🥗 Health</option>
                    <option value="Productivity">⚡ Productivity</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <FaStickyNote className="text-purple-500" />
                  Description
                  <span className="text-xs text-slate-500">
                    (optional but recommended)
                  </span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="What will this habit help you achieve? Why is it important to you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all duration-200 resize-y placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              {/* Reminder + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <FaClock className="text-amber-500" />
                    Daily Reminder
                  </label>
                  <input
                    type="time"
                    name="reminder"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <FaImage className="text-cyan-500" />
                    Icon / Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/habit-icon.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3.5 px-6 rounded-xl font-semibold text-white text-lg
                    bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600
                    hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700
                    focus:ring-4 focus:ring-blue-500/30
                    shadow-lg hover:shadow-xl
                    transform hover:-translate-y-0.5 transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center justify-center gap-2
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaPlus /> Create Habit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MotionLayout>
  );
};

export default AddHabit;
