import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
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
      </div>
    </nav>
  );
};

export default Navbar;
