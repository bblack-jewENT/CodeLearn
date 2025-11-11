import { useState, useEffect } from "react";

const Dashboard = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("codelearn-progress") || "{}"
    );
    setProgress(savedProgress);
  }, []);

  const courses = [
    { id: 1, title: "HTML Basics", lessons: 3 },
    { id: 2, title: "CSS Styling", lessons: 3 },
    { id: 3, title: "JavaScript Fundamentals", lessons: 3 },
    { id: 4, title: "React Components", lessons: 3 },
  ];

  const getCourseProgress = (courseId) => {
    const courseLessons = courses.find((c) => c.id === courseId)?.lessons || 0;
    const completedQuizzes = Object.keys(progress).filter((key) =>
      key.startsWith(`quiz-${courseId}-`)
    ).length;
    return Math.round((completedQuizzes / courseLessons) * 100);
  };

  const totalProgress =
    courses.reduce((acc, course) => acc + getCourseProgress(course.id), 0) /
    courses.length;

  return (
    <div className="container">
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Your Learning Dashboard
      </h1>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Overall Progress
        </h2>
        <div
          style={{
            width: "100%",
            background: "#eee",
            borderRadius: "8px",
            height: "16px",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              height: "16px",
              borderRadius: "8px",
              width: `${totalProgress}%`,
            }}
          ></div>
        </div>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>
          {Math.round(totalProgress)}% Complete
        </p>
      </div>

      {/* Course Progress */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {courses.map((course) => {
          const courseProgress = getCourseProgress(course.id);
          return (
            <div key={course.id} className="card" style={{ minWidth: "250px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                {course.title}
              </h3>
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  borderRadius: "8px",
                  height: "12px",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    background: "#22c55e",
                    height: "12px",
                    borderRadius: "8px",
                    width: `${courseProgress}%`,
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#666" }}>
                {courseProgress}% Complete
              </p>

              {/* Quiz Scores */}
              <div style={{ marginTop: "1rem" }}>
                <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Quiz Scores:
                </h4>
                {Object.entries(progress)
                  .filter(([key]) => key.startsWith(`quiz-${course.id}-`))
                  .map(([key, value]) => (
                    <div
                      key={key}
                      style={{ fontSize: "0.95rem", color: "#666" }}
                    >
                      Lesson {key.split("-")[2]}: {value.score}/{value.total}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
