
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

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

     
      const registerUser = async (name, email, password, photoURL) => {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name, photoURL });
            setUser(result.user);
      };

    
      const loginUser = (email, password) => {
            return signInWithEmailAndPassword(auth, email, password);
      };

      
      const googleLogin = () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
      };

     
      const signOutUser = () => signOut(auth);

     
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
      };

      return (
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      );
};

export { AuthProvider, AuthContext };
