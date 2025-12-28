import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Quiz from "./components/Quiz";
import Assignments from "./components/Assignments";
import Dashboard from "./components/Dashboard";
import Pricing from "./components/Pricing";
import Settings from "./components/Settings";
import "./lesson-responsive.css";

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  return error ? (
    <div style={{ color: "red", padding: 20 }}>
      <h2>Something went wrong:</h2>
      <pre>{error.toString()}</pre>
    </div>
  ) : (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        try {
          return child;
        } catch (e) {
          setError(e);
          return null;
        }
      })}
    </React.Fragment>
  );
}

const paypalOptions = {
  "client-id":
    "AcNMqbTWkH5sdDYCc77yU48MFtRyBWCFJleeww9fZo1Bd7_lJ8Gw_4-DmDHjGSFEp_mQ5Df6Ah489ybV", // PayPal sandbox client ID
  currency: "USD",
  intent: "capture",
};

function App() {
  console.log("App mounted: rendering App component");
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              {/* Fallback removed */}
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route
                    path="/quiz/:courseId/:lessonId"
                    element={
                      <ProtectedRoute>
                        <Quiz />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/assignments/:courseId/:lessonId"
                    element={<Assignments />}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <ProtectedRoute>
                        <Pricing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
