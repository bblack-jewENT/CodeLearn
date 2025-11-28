import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout, showAuthModal, openAuthModal, closeAuthModal } =
    useAuth();

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
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "35px", display: "flex", gap: "1rem" }}>
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
          {currentUser && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="navbar-link">
                Welcome, {currentUser.displayName}
              </span>
              <button onClick={handleLogout} className="btn" style={{marginLeft: "1rem",}}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
