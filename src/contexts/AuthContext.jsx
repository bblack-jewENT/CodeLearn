import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  applyActionCode,
  reload,
} from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  async function signup(email, password, username) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: username });
    // Send email verification after signup
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }

  // Helper to apply email verification code from link
  async function verifyEmailActionCode(oobCode) {
    await applyActionCode(auth, oobCode);
    if (auth.currentUser) {
      await reload(auth.currentUser);
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile,
    showAuthModal,
    openAuthModal,
    closeAuthModal,
    verifyEmailActionCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
