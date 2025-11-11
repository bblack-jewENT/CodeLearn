import { useState } from "react";
import LessonCard from "./LessonCard";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "HTML Basics",
      description: "Learn the foundation of web development",
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
    },
    {
      id: 2,
      title: "CSS Styling",
      description: "Make your websites beautiful with CSS",
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
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Add interactivity to your websites",
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
    },
    {
      id: 4,
      title: "React Components",
      description: "Build modern web applications with React",
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
            </h2>
            <p style={{ marginBottom: "1rem" }}>{course.description}</p>
            <div>
              {course.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  courseId={course.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
