import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <GraduationCap />
        <Link to="/" className="logo" style={{ marginLeft: "0.5rem" }}>
          CourseCode
        </Link>
        <div className="container">
          <div style={{ marginRight: "35px" }}>
            <Link className="navbar-link" to="/">
              Home
            </Link>
            <Link className="navbar-link" to="/courses">
              Courses
            </Link>
            <Link className="navbar-link" to="/pricing">
              Pricing
            </Link>
            <Link className="navbar-link" to="/dashboard">
              Dashboard
            </Link>
          </div>
          <div>
            {currentUser ? (
              <>
                <span className="navbar-link">
                  Welcome, {currentUser.displayName || currentUser.email}
                </span>
                <button onClick={handleLogout} className="navbar-link ml-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAuth(true)}
                  className="navbar-link"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="navbar-link ml-4"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default Navbar;
