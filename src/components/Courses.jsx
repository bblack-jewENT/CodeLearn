import { useState } from "react";
import LessonCard from "./LessonCard";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const subscription = localStorage.getItem("subscription") || "free";

  const courses = [
    {
      id: 1,
      title: "HTML Basics",
      description: "Learn the foundation of web development",
      isPremium: false,
      lessons: [
        {
          id: 1,
          title: "Introduction to HTML",
          content:
            "HTML is the standard markup language for creating web pages.",
        },
        {
          id: 2,
          title: "HTML Elements",
          content: "Elements are the building blocks of HTML pages.",
        },
        {
          id: 3,
          title: "HTML Attributes",
          content:
            "Attributes provide additional information about HTML elements.",
        },
      ],
      assignments:
        subscription === "premium"
          ? [
              {
                id: 1,
                title: "Build a Simple Webpage",
                description:
                  "Create a basic HTML page with headings, paragraphs, and links.",
              },
            ]
          : [],
    },
    {
      id: 2,
      title: "CSS Styling",
      description: "Make your websites beautiful with CSS",
      isPremium: false,
      lessons: [
        {
          id: 4,
          title: "Introduction to CSS",
          content: "CSS is used to describe the presentation of a document.",
        },
        {
          id: 5,
          title: "CSS Selectors",
          content:
            "Selectors are used to select the HTML elements you want to style.",
        },
        {
          id: 6,
          title: "CSS Properties",
          content:
            "Properties define how the selected elements should be styled.",
        },
      ],
      assignments:
        subscription === "premium"
          ? [
              {
                id: 2,
                title: "Style a Portfolio Page",
                description:
                  "Apply CSS to create an attractive portfolio layout.",
              },
            ]
          : [],
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Add interactivity to your websites",
      isPremium: false,
      lessons: [
        {
          id: 7,
          title: "Introduction to JavaScript",
          content:
            "JavaScript is a programming language that adds interactivity to web pages.",
        },
        {
          id: 8,
          title: "Variables and Data Types",
          content: "Variables are containers for storing data values.",
        },
        {
          id: 9,
          title: "Functions",
          content:
            "Functions are blocks of code designed to perform a particular task.",
        },
      ],
      assignments:
        subscription === "premium"
          ? [
              {
                id: 3,
                title: "Create Interactive Elements",
                description:
                  "Build buttons and forms with JavaScript functionality.",
              },
            ]
          : [],
    },
    {
      id: 4,
      title: "React Components",
      description: "Build modern web applications with React",
      isPremium: false,
      lessons: [
        {
          id: 10,
          title: "Introduction to React",
          content:
            "React is a JavaScript library for building user interfaces.",
        },
        {
          id: 11,
          title: "Components",
          content: "Components are the building blocks of React applications.",
        },
        {
          id: 12,
          title: "State and Props",
          content:
            "State and props are used to manage data in React components.",
        },
      ],
      assignments:
        subscription === "premium"
          ? [
              {
                id: 4,
                title: "Build a React App",
                description:
                  "Create a simple React application with multiple components.",
              },
            ]
          : [],
    },
    {
      id: 5,
      title: "Advanced Web Development",
      description:
        "Master advanced techniques for professional web development",
      isPremium: true,
      lessons:
        subscription === "premium"
          ? [
              {
                id: 13,
                title: "Advanced CSS",
                content: "Learn advanced CSS techniques like Flexbox and Grid.",
              },
              {
                id: 14,
                title: "ES6+ JavaScript",
                content:
                  "Explore modern JavaScript features and best practices.",
              },
              {
                id: 15,
                title: "React Hooks",
                content: "Master React Hooks for state management.",
              },
            ]
          : [],
      assignments:
        subscription === "premium"
          ? [
              {
                id: 5,
                title: "Full-Stack Project",
                description: "Build a complete web application from scratch.",
              },
            ]
          : [],
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Our Courses
      </h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            width: "82.5%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Courses Grid */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {filteredCourses.map((course) => (
          <div key={course.id} className="card" style={{ minWidth: "250px" }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {course.title}
              {course.isPremium && (
                <span
                  style={{
                    background: "#ffd700",
                    color: "#000",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  Premium
                </span>
              )}
            </h2>
            <p style={{ marginBottom: "1rem" }}>{course.description}</p>
            {course.isPremium && subscription !== "premium" ? (
              <div
                style={{
                  background: "#f0f0f0",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  This course requires a premium subscription
                </p>
                <a href="/pricing" className="btn">
                  Upgrade to Premium
                </a>
              </div>
            ) : (
              <div>
                {course.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    courseId={course.id}
                  />
                ))}
                {course.assignments.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                      Assignments:
                    </h4>
                    {course.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        style={{
                          background: "#f9f9f9",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>{assignment.title}</strong>
                        <p style={{ fontSize: "0.9rem", color: "#666" }}>
                          {assignment.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
