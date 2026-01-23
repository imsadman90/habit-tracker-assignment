import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaImage, FaSave, FaSpinner } from "react-icons/fa";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const changed =
      formData.displayName.trim() !== (user.displayName || "").trim() ||
      formData.photoURL.trim() !== (user.photoURL || "").trim();

    setHasChanges(changed);
  }, [formData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await updateUserProfile(
        formData.displayName.trim(),
        formData.photoURL.trim() || null,
      );

      toast.success("Profile updated successfully 🎉", {
        position: "top-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-8 pb-6 md:px-10 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/70 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-indigo-950/30 border-b border-slate-200/70 dark:border-slate-800/70">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
                Profile
              </p>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Update your personal information and avatar.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-blue-500/20 dark:bg-blue-500/10 rounded-full" />
                <img
                  src={formData.photoURL || defaultAvatar}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl relative"
                  onError={(e) => (e.target.src = defaultAvatar)}
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {formData.displayName || "User"}
              </h2>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <FaEnvelope className="text-indigo-500" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <FaUser className="text-indigo-500" />
                  Display Name
                </label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Photo URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <FaImage className="text-blue-500" />
                  Profile Photo URL
                </label>
                <input
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <FaEnvelope className="text-purple-500" />
                  Email
                </label>
                <input
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 cursor-not-allowed"
                />
              </div>

              {/* Submit */}
              <button
                disabled={!hasChanges || loading}
                className={`w-full py-3.5 rounded-xl font-semibold text-white flex justify-center items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/10
                ${
                  hasChanges
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
