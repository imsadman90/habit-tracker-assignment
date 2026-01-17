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
        formData.photoURL.trim() || null
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
    <div className="flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/50">
          {/* Header */}
          <div className="px-6 pt-8 pb-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800/80 dark:to-indigo-950/30 border-b border-slate-200/70 dark:border-slate-700/60">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mt-2">
              Update your personal information
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={formData.photoURL || defaultAvatar}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-xl"
                onError={(e) => (e.target.src = defaultAvatar)}
              />

              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
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
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FaUser className="text-indigo-500" />
                  Display Name
                </label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800/60"
                  required
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FaImage className="text-blue-500" />
                  Profile Photo URL
                </label>
                <input
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-slate-800/60"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FaEnvelope className="text-purple-500" />
                  Email
                </label>
                <input
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 cursor-not-allowed"
                />
              </div>

              {/* Submit */}
              <button
                disabled={!hasChanges || loading}
                className={`w-full py-3.5 rounded-xl font-semibold text-white flex justify-center gap-2
                ${
                  hasChanges
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-xl"
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