import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CourseCode
      </Link>
      <div className="container">
        <div style={{ marginRight: "35px" }}>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
