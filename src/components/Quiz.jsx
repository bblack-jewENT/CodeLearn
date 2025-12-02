import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Mock lesson data
  const lessonData = {
    1: {
      title: "HTML Basics",
      history: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <h2>Introduction to HTML</h2>
            <h3>A bit of history…</h3>
            <ul>
              <li>The world wide web began as a way to share documents on the internet (which was starting to gain a foothold with other functionality like email & newsgroups).</li>
              <li>It was introduced in 1990 by English physicist Tim Berners-Lee and Belgian computer scientist Robert Cailliau while both were working at CERN.</li>
            </ul>
            <h3>HyperText Markup Language</h3>
            <ul>
              <li>Initially, the documents that were shared on the WWW were text documents that were "marked-up" with extra tags to define the structural or visual aspects of the document.</li>
              <li>Another effect of this language was to add extra functionality into the document, such as links to other online pages, creating a network of interconnected documents (this is the "hypertext" portion of the html name).</li>
            </ul>
            <h3>Fast-forward to now…</h3>
            <ul>
              <li>As computer technology and the WWW have evolved, html has continued to allow the content of web pages to evolve.</li>
              <li>Aside from just links, we now enjoy multimedia content and applications that are seamlessly integrated into dynamic web pages, allowing the WWW to do much more than facilitate the sharing of documents.</li>
            </ul>
            <h3>Overview of HTML</h3>
            <ul>
              <li>Files have the .html or .htm extension.</li>
              <li>Files can be composed in ordinary text editors.</li>
              <li>Subsets of the text can be enclosed in "tags" to give that portion of text some structure or functionality: <tag>blahblahblah</tag></li>
              <li>Tags have the general form: <tagname attribute1="value1" attribute2="value2"></li>
            </ul>
            <h3>An Example</h3>
            <p>The following code:</p>
            <pre><code><html>
            <title>Example</title>
            &lt;body&gt;
            Hello World
            &lt;/body&gt;
            </code></pre>
            <p>Would look like: Hello World</p>
            <h3>Some Formatting Tags</h3>
            <ul>
              <li>&lt;p&gt;, &lt;/p&gt; - start and end of a paragraph</li>
              <li>&lt;b&gt;, &lt;/b&gt; - start and end of bold text</li>
              <li>&lt;i&gt;, &lt;/i&gt; - start and end of italicized text</li>
              <li>&lt;u&gt;, &lt;/u&gt; - start and end of underlined text</li>
              <li>&lt;br&gt; - insert a line break to override the default behavior of just wrapping the text around to the next line.</li>
            </ul>
            <h3>Some More Formatting Tags</h3>
            <ul>
              <li>&lt;h1&gt; , /h1&gt; - set enclosed text to be a "Level 1 heading" (also &lt;h2&gt;, &lt;h3&gt;, etc.)</li>
              <li>&lt;font&gt; , &lt;/font&gt; - set font for enclosed text with style options set in tag. i.e. - &lt;font face = "Arial" color = "blue" size = "10"&gt;blahblahblah&lt;/font&gt;</li>
              <li>Note: web browsers ignore all but the first space between pieces of text, and any line breaks in your .html file. It is the tags you include which determine how the page will look, not the way it looks in your text editor.</li>
            </ul>
          `,
          }}
        />
      ),
      overview:
        "In this lesson, we'll explore the fundamentals of HTML including tags, elements, attributes, and document structure. The quiz will test your understanding of common HTML tags, their purposes, and how they work together to create web pages.",
      videoId: "UB1O30fR-EE",
    },
    2: {
      title: "CSS Styling",
      history:
        "CSS was first proposed by Håkon Wium Lie in 1994 while working with Tim Berners-Lee at CERN. The first CSS specification became a W3C recommendation in 1996. CSS has evolved through multiple versions, with CSS3 introducing advanced features like animations, transitions, and responsive design capabilities.",
      overview:
        "This lesson covers CSS syntax, selectors, properties, and the box model. You'll learn how to style HTML elements and create visually appealing web pages. The quiz will focus on CSS selectors, properties, and common styling techniques.",
      videoId: "yfoY53QXEnI",
    },
    3: {
      title: "JavaScript Fundamentals",
      history:
        "JavaScript was created by Brendan Eich in 1995 while working at Netscape Communications. Originally called Mocha, then LiveScript, it was renamed JavaScript to capitalize on Java's popularity. ECMAScript, the standardized version, was first released in 1997 and continues to evolve with annual updates.",
      overview:
        "We'll cover JavaScript basics including variables, data types, functions, and control structures. The quiz will test your knowledge of JavaScript syntax, data types, functions, and basic programming concepts.",
      videoId: "W6NZfCO5SIk",
    },
    4: {
      title: "React Components",
      history:
        "React was created by Facebook (now Meta) in 2013 and open-sourced later that year. Developed by Jordan Walke, it was initially used internally at Facebook before becoming one of the most popular JavaScript libraries. React introduced component-based architecture and revolutionized frontend development.",
      overview:
        "This lesson introduces React concepts including components, JSX, props, state, and hooks. The quiz will cover React fundamentals, component lifecycle, state management, and common React patterns.",
      videoId: "Ke90Tje7VS0",
    },
  };

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
      {
        question: "What is the purpose of the <head> tag in HTML?",
        options: [
          "To display the main content",
          "To contain metadata about the document",
          "To create a header section",
          "To define the body",
        ],
        correct: 1,
      },
      {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1,
      },
      {
        question: "What does the <br> tag do?",
        options: [
          "Creates a bold text",
          "Inserts a line break",
          "Defines a paragraph",
          "Creates a button",
        ],
        correct: 1,
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
      {
        question: "How do you select an element with id 'myId' in CSS?",
        options: ["#myId", ".myId", "myId", "*myId"],
        correct: 0,
      },
      {
        question: "What is the difference between margin and padding?",
        options: [
          "Margin is inside the border, padding is outside",
          "Padding is inside the border, margin is outside",
          "They are the same",
          "Margin affects text, padding affects background",
        ],
        correct: 1,
      },
      {
        question: "How do you make text bold in CSS?",
        options: [
          "font-weight: bold;",
          "text-decoration: bold;",
          "font-style: bold;",
          "text-weight: bold;",
        ],
        correct: 0,
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
      {
        question: "What is the output of console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2,
      },
      {
        question: "How do you declare a function in JavaScript?",
        options: [
          "function myFunction() {}",
          "def myFunction() {}",
          "func myFunction() {}",
          "method myFunction() {}",
        ],
        correct: 0,
      },
      {
        question: "What is an array in JavaScript?",
        options: [
          "A single value",
          "A collection of elements",
          "A type of loop",
          "A conditional statement",
        ],
        correct: 1,
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
      {
        question: "What is the purpose of the useEffect hook?",
        options: [
          "To manage state",
          "To handle side effects",
          "To create components",
          "To render JSX",
        ],
        correct: 1,
      },
      {
        question: "How do you pass props to a component?",
        options: [
          "<Component prop={value} />",
          "<Component value />",
          "<Component.prop = value />",
          "<Component setProp(value) />",
        ],
        correct: 0,
      },
      {
        question: "What is the difference between state and props?",
        options: [
          "State is mutable, props are immutable",
          "Props are mutable, state is immutable",
          "They are the same",
          "State is for styling, props for data",
        ],
        correct: 0,
      },
    ],
  };

  useEffect(() => {
    const courseQuestions = quizData[courseId] || [];
    setQuestions(courseQuestions);
    setAnswers(new Array(courseQuestions.length).fill(null));
  }, [courseId]);

  // Show lesson first, then quiz after button click
  const [showQuiz, setShowQuiz] = useState(false);

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

      // Check subscription and redirect premium users to assignments
      const subscription = localStorage.getItem("subscription") || "free";
      if (subscription === "premium") {
        navigate(`/assignments/${courseId}/${lessonId}`);
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (!showQuiz) {
    const lesson = lessonData[courseId];
    if (!lesson) {
      return <div className="container">Loading lesson...</div>;
    }
    return (
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          {lesson.title}
        </h1>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            History
          </h2>
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            {lesson.history()}
          </div>
        </div>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            What You'll Learn
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            {lesson.overview}
          </p>
        </div>
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Video Tutorial
          </h2>
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Tutorial Video"
            />
          </div>
        </div>
        <button
          onClick={() => setShowQuiz(true)}
          className="btn"
          style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
        >
          Mark Done
        </button>
      </div>
    );
  }

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
