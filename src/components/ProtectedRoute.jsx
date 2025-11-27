import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Auth onClose={() => {}} />; // onClose does nothing, user must log in
  }

  return children;
};

export default ProtectedRoute;
