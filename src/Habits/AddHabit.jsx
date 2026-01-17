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
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          {/* Card */}
          <div
            className="bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 
                        rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden 
                        border border-slate-200/60 dark:border-slate-700/60
                        backdrop-blur-sm transform transition-all duration-300"
          >
            {/* Header */}
            <div
              className="px-6 pt-8 pb-4 md:px-10 md:pt-10 md:pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 
                          dark:from-slate-800/80 dark:to-indigo-950/30 border-b border-slate-200/70 dark:border-slate-700/60"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl text-white shadow-lg">
                  <FaPlus size={22} />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                              dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
                >
                  Create New Habit
                </h2>
              </div>
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Start building a better you, one habit at a time
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
              {/* Name + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaStickyNote className="text-blue-500" />
                    Habit Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={60}
                    placeholder="e.g. Morning Meditation"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-blue-500/40 
                             focus:border-blue-500 outline-none transition-all duration-200
                             placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaTag className="text-indigo-500" />
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-blue-500/40 
                             focus:border-blue-500 outline-none transition-all duration-200 text-slate-700 dark:text-slate-300"
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
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FaStickyNote className="text-purple-500" />
                  Description{" "}
                  <span className="text-xs text-slate-500">
                    (optional but recommended)
                  </span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="What will this habit help you achieve? Why is it important to you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                           bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-blue-500/40 
                           focus:border-blue-500 outline-none transition-all duration-200 resize-y
                           placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              {/* Reminder + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaClock className="text-amber-500" />
                    Daily Reminder
                  </label>
                  <input
                    type="time"
                    name="reminder"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-blue-500/40 
                             focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaImage className="text-cyan-500" />
                    Icon / Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/habit-icon.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-blue-500/40 
                             focus:border-blue-500 outline-none transition-all duration-200
                             placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3.5 px-6 rounded-xl font-semibold text-white text-lg
                    bg-gradient-to-r from-blue-600 to-indigo-600 
                    hover:from-blue-700 hover:to-indigo-700
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
