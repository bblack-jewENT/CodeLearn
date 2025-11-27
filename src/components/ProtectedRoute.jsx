import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

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

  return children;
};

export default ProtectedRoute;
