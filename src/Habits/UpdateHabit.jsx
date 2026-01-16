import { useLoaderData } from "react-router";
import { useState } from "react";
import MotionLayout from "../layouts/MotionLayout";
import {
  FaEdit,
  FaSave,
  FaSpinner,
  FaStickyNote,
  FaTag,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";

const UpdateHabit = () => {
  const { result: habit } = useLoaderData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: habit.name || "",
    category: habit.category || "",
    description: habit.description || "",
    image: habit.image || "",
  });

  const hasChanges =
    formData.name.trim() !== (habit.name || "").trim() ||
    formData.category !== habit.category ||
    formData.description.trim() !== (habit.description || "").trim() ||
    formData.image.trim() !== (habit.image || "").trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Habit name is required");
      return;
    }

<<<<<<< HEAD
    fetch(`VITE_API_URL/habits/${habit._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => toast.success("Successfully updated!"))
      .catch((err) => console.log(err));
=======
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `https://habit-server-kappa.vercel.app/habits/${habit._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            category: formData.category,
            description: formData.description.trim(),
            image: formData.image.trim() || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update habit");

      toast.success(
        data.success
          ? "Habit updated successfully! 🎉"
          : "Failed to update habit",
        {
          position: "top-center",
          duration: 3000,
        }
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update habit");
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> 2055b98 (polished the project)
  };

  return (
    <MotionLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div
            className="bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 
                          rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border 
                          border-slate-200/60 dark:border-slate-700/60"
          >
            {/* Header */}
            <div
              className="px-6 pt-8 pb-5 bg-gradient-to-r from-blue-50 to-indigo-50 
                           dark:from-slate-800/80 dark:to-indigo-950/30 border-b border-slate-200/70 dark:border-slate-700/60"
            >
<<<<<<< HEAD
              <option value="" disabled>
                Select category
              </option>
              <option value="Morning">Morning</option>
              <option value="Work">Work</option>
              <option value="Fitness">Fitness</option>
              <option value="Evening">Evening</option>
              <option value="Study">Study</option>
            </select>
            <textarea
              defaultValue={habit.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl"
              placeholder="Description"
            />
            <input
              type="url"
              defaultValue={habit.image}
              name="image"
              className="input w-full rounded-full"
              placeholder="Image URL"
            />
            <input
              type="email"
              value={habit.created_by}
              readOnly
              className="input w-full rounded-full bg-gray-100"
            />
            <input
              type="text"
              value={habit.user_name}
              readOnly
              className="input w-full rounded-full bg-gray-100"
            />
            <button
              type="submit"
              className="btn w-full bg-[#53c2ed] text-[#003c6b] hover:bg-[#6bb5db] transition-colors rounded-full mt-4"
            >
              Update Habit
            </button>
          </form>
=======
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-3 rounded-xl text-white shadow-lg">
                  <FaEdit size={22} />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 
                              dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent"
                >
                  Edit Habit
                </h2>
              </div>
              <p className="text-center text-slate-600 dark:text-slate-400">
                Update your habit details
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
              {/* Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaStickyNote className="text-indigo-500" />
                    Habit Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-indigo-500/40 
                             focus:border-indigo-500 outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <FaTag className="text-blue-500" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                             bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-indigo-500/40 
                             focus:border-indigo-500 outline-none transition-all duration-200"
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
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What is this habit about? Why is it important?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                           bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-indigo-500/40 
                           focus:border-indigo-500 outline-none transition-all duration-200 resize-y"
                />
              </div>

              {/* Image */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FaImage className="text-cyan-500" />
                  Icon / Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/habit-icon.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 
                           bg-white dark:bg-slate-800/60 focus:ring-2 focus:ring-indigo-500/40 
                           focus:border-indigo-500 outline-none transition-all duration-200"
                />
              </div>

              {/* Read-only info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Created By
                  </label>
                  <input
                    type="email"
                    value={habit.created_by}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 
                             border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 
                             cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={habit.user_name || "—"}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 
                             border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 
                             cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !hasChanges}
                  className={`
                    w-full py-3.5 px-6 rounded-xl font-semibold text-white text-lg
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    ${
                      hasChanges && !isSubmitting
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-slate-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {hasChanges ? "Save Changes" : "No Changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
>>>>>>> 2055b98 (polished the project)
        </div>
      </div>
    </MotionLayout>
  );
};

export default UpdateHabit;
