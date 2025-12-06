import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, login, closeAuthModal } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(formData.email, formData.password, formData.username);
      } else {
        await login(formData.email, formData.password);
      }
      closeAuthModal(); // Close the modal on success
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 90,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "28rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
        }}
        className="login-form-container"
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#223a5cff",
              marginBottom: "0.5rem",
            }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p style={{ color: "#6b7280" }}>
            {isSignUp
              ? "Join CourseCode to start learning"
              : "Sign in to your account"}
          </p>
        </div>
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {isSignUp && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: "92%",
                  padding: "0.75rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
                placeholder="Enter your username"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          )}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                transition:
                  "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              }}
              placeholder="Enter your email"
              required
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "92%",
                padding: "0.75rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                transition:
                  "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
              }}
              placeholder="Enter your password"
              required
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#207985",
              color: "white",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              transition: "all 0.2s",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1741a3")}
            onMouseOut={(e) => (e.target.style.background = "#207985")}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    height: "1.25rem",
                    width: "1.25rem",
                    border: "2px solid transparent",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginRight: "0.5rem",
                  }}
                ></div>
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </div>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#b4b7bdff" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                color: "#2563eb",
                fontWeight: "500",
                marginLeft: "0.25rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1d4ed8")}
              onMouseOut={(e) => (e.target.style.color = "#2563eb")}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
        <button
          onClick={closeAuthModal}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "#9ca3af",
            fontSize: "1.5rem",
            fontWeight: "300",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.color = "#6b7280")}
          onMouseOut={(e) => (e.target.style.color = "#9ca3af")}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Auth;
