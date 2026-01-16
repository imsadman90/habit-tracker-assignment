import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Register with Email & Password
  const registerUser = async (name, email, password, photoURL = null) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL || null,
    });

    setUser({ ...result.user });
    return result;
  };

  // 🔹 Login with Email & Password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Google Login (photo auto comes from Google)
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // 🔹 Logout
  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔹 Update Profile (Name + Photo)
  const updateUserProfile = async (displayName, photoURL) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName,
      photoURL: photoURL || null,
    });

    // 🔥 Force UI refresh
    setUser({ ...auth.currentUser });
  };

  // 🔹 Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    signOutUser,
    updateUserProfile, // ✅ important
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;