import { Link } from "react-router-dom";

const LessonCard = ({ lesson, courseId }) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.5rem",
        background: "#fafafa",
      }}
    >
      <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        {lesson.title}
      </h3>
      <p
        style={{ fontSize: "0.95rem", color: "#666", marginBottom: "0.75rem" }}
      >
        {lesson.content}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to={`/lesson/${courseId}/${lesson.id}`}
          style={{
            color: "#2563eb",
            textDecoration: "underline",
            fontSize: "0.95rem",
          }}
        >
          Read Lesson
        </Link>
        <Link
          to={`/quiz/${courseId}/${lesson.id}`}
          className="btn"
          style={{ background: "#2a8a4dff", fontSize: "0.95rem" }}
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
