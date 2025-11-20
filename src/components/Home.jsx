import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Home = () => {
  const aboutRef = useRef();
  const coursesRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (coursesRef.current) observer.observe(coursesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('src/img/college-students1.jpg')",
          color: "#fff",
          padding: "10rem 0",
          marginTop: "1.3rem",
          marginRight: "0.5px",
          marginLeft: "-8px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Welcome to CourseCode
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            Learn web development basics through interactive tutorials and
            quizzes
          </p>
          <Link to="/courses" className="btn">
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="animate-on-scroll"
        style={{ padding: "3rem 0" }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            About CourseCode
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            CourseCode is your gateway to mastering web development. We offer
            beginner-friendly courses in HTML, CSS, JavaScript, and React,
            complete with interactive lessons and quizzes to track your
            progress.
          </p>
        </div>
      </section>

      {/* Courses Preview */}
      <section
        ref={coursesRef}
        className="animate-on-scroll"
        style={{ background: "#fff", padding: "3rem 0" }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Our Courses
          </h2>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              className="card"
              style={{ textAlign: "center", minWidth: "200px" }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                HTML Basics
              </h3>
              <p>Learn the foundation of web pages</p>
            </div>
            <div
              className="card"
              style={{ textAlign: "center", minWidth: "200px" }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                CSS Styling
              </h3>
              <p>Make your websites beautiful</p>
            </div>
            <div
              className="card"
              style={{ textAlign: "center", minWidth: "200px" }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                JavaScript Fundamentals
              </h3>
              <p>Add interactivity to your sites</p>
            </div>
            <div
              className="card"
              style={{ textAlign: "center", minWidth: "200px" }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                React Components
              </h3>
              <p>Build modern web applications</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/courses" className="btn">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Join Our Community
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
            Connect with fellow learners and get help when you need it
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <a href="#" className="btn">
              Join Discord
            </a>
            <a href="#" className="btn" style={{ background: "#22c55e" }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
