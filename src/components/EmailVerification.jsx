import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const spinnerStyle = {
  display: "inline-block",
  width: "2rem",
  height: "2rem",
  border: "4px solid #2563eb",
  borderTop: "4px solid #fff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const EmailVerification = () => {
  const { currentUser } = useAuth();
  const [verified, setVerified] = useState(currentUser?.emailVerified);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let interval;
    if (!verified) {
      interval = setInterval(async () => {
        setChecking(true);
        await currentUser.reload();
        if (currentUser.emailVerified) {
          setVerified(true);
        }
        setChecking(false);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [verified, currentUser]);

  useEffect(() => {
    if (verified) {
      setTimeout(() => {
        window.location.href = "/courses";
      }, 1500);
    }
  }, [verified]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
      {!verified ? (
        <>
          <div style={spinnerStyle}></div>
          <h2 style={{ marginTop: "1.5rem" }}>
            Waiting for Email Confirmation...
          </h2>
          <p style={{ marginTop: "1rem" }}>
            Please check your email and click the verification link.
            <br />
            This page will automatically redirect once your email is confirmed.
          </p>
        </>
      ) : (
        <>
          <div style={{ color: "#22c55e", fontSize: "2rem" }}>✔</div>
          <h2 style={{ marginTop: "1.5rem" }}>Email Confirmed!</h2>
          <p style={{ marginTop: "1rem" }}>Redirecting to courses...</p>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
