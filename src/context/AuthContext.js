import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../environments/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    return;
  }

  async function logOut() {
    await signOut(auth);
    return;
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
    return;
  }

  function updateEmail(email) {
    return currentUser.updateEmail(auth, email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
