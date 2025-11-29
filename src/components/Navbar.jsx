import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Auth from "./Auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      const menu = document.querySelector(".navbar-menu");
      const btn = document.querySelector(".hamburger-btn");
      if (
        menu &&
        !menu.contains(event.target) &&
        btn &&
        !btn.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand">
          <GraduationCap />
          <Link to="/" className="logo" style={{ marginLeft: "0.5rem" }}>
            CourseCode
          </Link>
        </div>
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="navbar-links">
            <Link
              className="navbar-link"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="navbar-link"
              to="/courses"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              className="navbar-link"
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="navbar-link"
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
          {currentUser && (
            <div className="navbar-user">
              <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                <div className="avatar">
                  {currentUser.displayName
                    ? currentUser.displayName.charAt(0).toUpperCase()
                    : currentUser.email.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                style={{ margingRight: "1.5rem" }}
                className="btn"
              >
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
