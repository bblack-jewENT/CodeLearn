import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

import EmailVerification from "./EmailVerification";

const ProtectedRoute = ({ children }) => {
  const { currentUser, showAuthModal, openAuthModal } = useAuth();

  React.useEffect(() => {
    if (!currentUser) {
      openAuthModal();
    }
  }, [currentUser, openAuthModal]);

  if (!currentUser) {
    return showAuthModal ? <Auth /> : null;
  }

  // Block access if email is not verified
  if (!currentUser.emailVerified) {
    return <EmailVerification email={currentUser.email} />;
  }

  return children;
};

export default ProtectedRoute;
