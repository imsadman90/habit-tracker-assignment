import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  const isPasswordValid = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;
    return hasUpper && hasLower && isLong;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid(password)) {
      setError(
        "Password must include uppercase, lowercase, and at least 6 characters."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/5GzXkwq/user.png",
      });

      toast.success(`Welcome ${name}! Account created.`);
      navigate("/my-habits");

      setName("");
      setEmail("");
      setPhotoURL("");
      setPassword("");
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Already have an account");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName || "User"}!`);
      navigate("/my-habits");
    } catch (err) {
      console.error("Google Sign-Up Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-10">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl flex overflow-hidden dark:bg-base-300">
        {/* Left Image/Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="https://img.freepik.com/premium-vector/young-person-sits-healthy-foods-activities-customizing-their-daily-wellness-routine-healthy-habit-customizable-cartoon-illustration_538213-154090.jpg"
            alt="Login Illustration"
            className="object-cover h-full w-full dark:opacity-60"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 md:p-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center dark:text-gray-400">
            Create Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Build habits, track progress, and transform your life.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 dark:text-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full dark:text-gray-400 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Photo URL (optional)
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full dark:text-gray-400 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters, uppercase & lowercase"
                className="w-full dark:text-gray-400 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Sign Up
            </button>
          </form>

          {/* Google Sign-In */}
          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleRegister}
              className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-red-500 to-pink-400 rounded-full text-white shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
                alt="Google"
                className="w-5 h-5 rounded-full"
              />
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
