import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Mock quiz data - in a real app, this would come from an API
  const quizData = {
    1: [
      // HTML Basics
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language",
        ],
        correct: 0,
      },
      {
        question: "Which tag is used to create a paragraph in HTML?",
        options: ["<p>", "<para>", "<text>", "<pg>"],
        correct: 0,
      },
    ],
    2: [
      // CSS Styling
      {
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Colorful Style Sheets",
        ],
        correct: 2,
      },
      {
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "bg-color"],
        correct: 2,
      },
    ],
    3: [
      // JavaScript Fundamentals
      {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correct: 3,
      },
      {
        question: "What is the correct way to write a comment in JavaScript?",
        options: [
          "// This is a comment",
          "/* This is a comment */",
          "# This is a comment",
          "<!-- This is a comment -->",
        ],
        correct: 0,
      },
    ],
    4: [
      // React Components
      {
        question: "What is JSX?",
        options: [
          "A JavaScript framework",
          "A syntax extension for JavaScript",
          "A CSS preprocessor",
          "A database query language",
        ],
        correct: 1,
      },
      {
        question:
          "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1,
      },
    ],
  };

  useEffect(() => {
    const courseQuestions = quizData[courseId] || [];
    setQuestions(courseQuestions);
    setAnswers(new Array(courseQuestions.length).fill(null));
  }, [courseId]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      // Save progress to localStorage
      const progress = JSON.parse(
        localStorage.getItem("codelearn-progress") || "{}"
      );
      progress[`quiz-${courseId}-${lessonId}`] = {
        score:
          score +
          (selectedAnswer === questions[currentQuestion].correct ? 1 : 0),
        total: questions.length,
      };
      localStorage.setItem("codelearn-progress", JSON.stringify(progress));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (questions.length === 0) {
    return <div className="container">Loading quiz...</div>;
  }

  if (showResult) {
    return (
      <div className="container" style={{ maxWidth: "600px" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Quiz Results
        </h1>
        <div className="card" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Your Score: {score}/{questions.length}
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            {score === questions.length
              ? "Perfect! 🎉"
              : score > questions.length / 2
              ? "Great job! 👍"
              : "Keep practicing! 💪"}
          </p>
          <button
            onClick={resetQuiz}
            className="btn"
            style={{ marginTop: "1rem" }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Quiz
      </h1>
      <div className="card">
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.95rem", color: "#666" }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          {questions[currentQuestion].question}
        </h2>
        <div>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.75rem",
                borderRadius: "8px",
                border:
                  selectedAnswer === index
                    ? "2px solid #2563eb"
                    : "1px solid #ccc",
                background: selectedAnswer === index ? "#e0eaff" : "#fff",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="btn"
          style={{
            marginTop: "1.5rem",
            background: selectedAnswer === null ? "#ccc" : "#2563eb",
            cursor: selectedAnswer === null ? "not-allowed" : "pointer",
          }}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
