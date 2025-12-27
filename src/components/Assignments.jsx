import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Assignments = () => {
  const { courseId, lessonId } = useParams();
  const [url, setUrl] = useState("");
  const subscriptionRaw = localStorage.getItem("subscription") || "free";
  const subscription = String(subscriptionRaw).toLowerCase();
  const isPremium = subscription === "premium";
  const navigate = useNavigate();

  const assignments = {
    1: {
      1: {
        title: "Build a Personal Portfolio Website",
        description:
          "Create a simple HTML page that includes your name, a brief bio, and links to your social media or projects. Use proper semantic HTML tags.",
        tasks: [
          "Create an index.html file",
          "Add a header with your name",
          "Include a paragraph about yourself",
          "Add links to external websites",
          "Style it with basic CSS (optional for bonus points)",
        ],
        resources: [
          "HTML tags reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
          "Getting started with HTML: https://www.w3schools.com/html/",
        ],
      },
      2: {
        title: "Create a Recipe Card Layout",
        description:
          "Design and implement a recipe card using HTML structure. Include ingredients list, instructions, and nutritional information.",
        tasks: [
          "Structure the recipe with proper headings",
          "Create an unordered list for ingredients",
          "Use ordered list for cooking steps",
          "Add images or placeholders",
          "Include preparation time and servings",
        ],
        resources: [
          "HTML lists: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul",
          "Semantic HTML: https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
        ],
      },
      3: {
        title: "Build a Contact Form",
        description:
          "Create a contact form with name, email, and message fields using HTML form elements.",
        tasks: [
          "Use the <form> element",
          "Add input fields for text and email",
          "Include a textarea for messages",
          "Add submit button",
          "Consider form validation (optional)",
        ],
        resources: [
          "HTML forms: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
          "Input types: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
        ],
      },
    },
    2: {
      1: {
        title: "Style a Blog Post Layout",
        description:
          "Apply CSS styling to create an attractive blog post layout with typography, colors, and spacing.",
        tasks: [
          "Style headings with different font sizes",
          "Add background colors and borders",
          "Implement proper spacing with margins and padding",
          "Style links with hover effects",
          "Make it responsive for different screen sizes",
        ],
        resources: [
          "CSS selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors",
          "CSS box model: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model",
        ],
      },
      2: {
        title: "Create a Navigation Menu",
        description:
          "Build a horizontal navigation menu with CSS styling and hover effects.",
        tasks: [
          "Create HTML structure for navigation",
          "Remove default list styling",
          "Style links as inline blocks",
          "Add hover and active states",
          "Make it responsive with media queries",
        ],
        resources: [
          "CSS flexbox: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox",
          "Media queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries",
        ],
      },
      3: {
        title: "Design a Product Card Grid",
        description:
          "Create a grid layout of product cards with images, titles, prices, and buttons.",
        tasks: [
          "Use CSS Grid or Flexbox for layout",
          "Style product cards with shadows and borders",
          "Add hover effects for interactivity",
          "Implement responsive grid",
          "Style buttons and typography",
        ],
        resources: [
          "CSS Grid: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
          "CSS transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions",
        ],
      },
    },
    3: {
      1: {
        title: "Build an Interactive To-Do List",
        description:
          "Create a JavaScript-powered to-do list where users can add, complete, and delete tasks.",
        tasks: [
          "Create HTML structure for the app",
          "Add event listeners for user interactions",
          "Implement add new task functionality",
          "Add ability to mark tasks as complete",
          "Include delete functionality",
        ],
        resources: [
          "DOM manipulation: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
          "Event handling: https://developer.mozilla.org/en-US/docs/Web/Events",
        ],
      },
      2: {
        title: "Create a Simple Calculator",
        description:
          "Build a basic calculator with addition, subtraction, multiplication, and division operations.",
        tasks: [
          "Design the calculator interface",
          "Add click handlers for number buttons",
          "Implement operation buttons",
          "Create calculation logic",
          "Handle edge cases (division by zero, etc.)",
        ],
        resources: [
          "JavaScript operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators",
          "Math object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
        ],
      },
      3: {
        title: "Build a Weather App Interface",
        description:
          "Create a weather app UI that displays current weather and forecast (focus on JavaScript logic, not API integration).",
        tasks: [
          "Design the weather display layout",
          "Implement temperature conversion functions",
          "Add weather icon logic based on conditions",
          "Create forecast display for multiple days",
          "Add interactive elements like unit toggle",
        ],
        resources: [
          "Date object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
          "Array methods: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
        ],
      },
    },
    4: {
      1: {
        title: "Build a React Counter Component",
        description:
          "Create a React component that displays a counter with increment and decrement buttons.",
        tasks: [
          "Set up React component with useState",
          "Create increment and decrement functions",
          "Render counter value and buttons",
          "Add styling with CSS-in-JS or classes",
          "Implement reset functionality",
        ],
        resources: [
          "React useState: https://react.dev/reference/react/useState",
          "React components: https://react.dev/learn/your-first-component",
        ],
      },
      2: {
        title: "Create a React Todo App",
        description:
          "Build a complete todo application with React, including add, edit, delete, and toggle functionality.",
        tasks: [
          "Create TodoList and TodoItem components",
          "Implement state management for todos",
          "Add form for creating new todos",
          "Implement edit and delete features",
          "Add local storage persistence",
        ],
        resources: [
          "React forms: https://react.dev/reference/react-dom/components/form",
          "React state management: https://react.dev/learn/managing-state",
        ],
      },
      3: {
        title: "Build a React Weather Dashboard",
        description:
          "Create a weather dashboard component that fetches and displays weather data using React hooks.",
        tasks: [
          "Set up useEffect for data fetching",
          "Implement loading and error states",
          "Display weather information in cards",
          "Add search functionality for cities",
          "Implement temperature unit conversion",
        ],
        resources: [
          "React useEffect: https://react.dev/reference/react/useEffect",
          "Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        ],
      },
    },
    5: {
      1: {
        title: "Build a Modern CSS Grid Dashboard",
        description:
          "Create a responsive dashboard layout using CSS Grid with multiple widget areas and adaptive sizing.",
        tasks: [
          "Design a dashboard with header, sidebar, main content, and footer areas",
          "Implement CSS Grid with named grid areas",
          "Create responsive breakpoints for mobile, tablet, and desktop",
          "Add hover effects and smooth transitions",
          "Ensure accessibility with proper semantic HTML",
        ],
        resources: [
          "CSS Grid Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
          "Responsive Design: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
        ],
      },
      2: {
        title: "Create a Flexbox Navigation System",
        description:
          "Build a complex navigation system using Flexbox with dropdowns, mobile hamburger menu, and smooth animations.",
        tasks: [
          "Implement horizontal navigation with Flexbox",
          "Add dropdown menus with CSS-only interactions",
          "Create mobile-responsive hamburger menu",
          "Add smooth transitions and hover effects",
          "Ensure keyboard navigation accessibility",
        ],
        resources: [
          "Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          "CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
        ],
      },
      3: {
        title: "Design a CSS Custom Property Theme System",
        description:
          "Create a comprehensive theme system using CSS custom properties (variables) for dark/light mode switching.",
        tasks: [
          "Set up CSS custom properties for colors, spacing, and typography",
          "Create light and dark theme variations",
          "Implement theme switching with JavaScript",
          "Add smooth transitions between themes",
          "Ensure all components respect the theme system",
        ],
        resources: [
          "CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
          "CSS Transitions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions",
        ],
      },
    },
    6: {
      1: {
        title: "Build a Modern ES6+ Todo Application",
        description:
          "Create an advanced todo application using modern JavaScript features including classes, modules, and async/await.",
        tasks: [
          "Use ES6+ features: arrow functions, destructuring, spread operator",
          "Implement classes for task management",
          "Add local storage with async/await patterns",
          "Create module system for code organization",
          "Add error handling with try/catch blocks",
        ],
        resources: [
          "ES6 Features: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript",
          "Async/Await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await",
        ],
      },
      2: {
        title: "Create an Interactive Data Visualization",
        description:
          "Build an interactive data visualization tool using modern JavaScript and the Canvas API.",
        tasks: [
          "Fetch and process data using fetch API and async/await",
          "Implement interactive charts using Canvas or SVG",
          "Add filtering and sorting functionality",
          "Use ES6+ array methods for data manipulation",
          "Create responsive design for different screen sizes",
        ],
        resources: [
          "Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
          "Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        ],
      },
      3: {
        title: "Build a Real-time Chat Application",
        description:
          "Create a real-time chat application using modern JavaScript with WebSocket simulation and local state management.",
        tasks: [
          "Implement WebSocket connection simulation",
          "Use React-like state management patterns",
          "Add message timestamps and user identification",
          "Implement typing indicators and message status",
          "Create message history and search functionality",
        ],
        resources: [
          "WebSockets: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
          "Local Storage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
        ],
      },
    },
    7: {
      1: {
        title: "Build a Performance-Optimized React Component Library",
        description:
          "Create a set of reusable React components with performance optimizations including memoization and code splitting.",
        tasks: [
          "Build components using React.memo and useMemo",
          "Implement code splitting with React.lazy and Suspense",
          "Create custom hooks for common functionality",
          "Add PropTypes for type checking",
          "Optimize re-renders with useCallback",
        ],
        resources: [
          "React Performance: https://react.dev/learn/render-and-commit",
          "Code Splitting: https://react.dev/reference/react/lazy",
        ],
      },
      2: {
        title: "Create a React Context Provider System",
        description:
          "Build a comprehensive context system for global state management with multiple providers and custom hooks.",
        tasks: [
          "Create multiple context providers for different concerns",
          "Implement custom hooks for context consumption",
          "Add context value optimization to prevent unnecessary renders",
          "Create a theme provider with dark/light mode switching",
          "Implement user authentication context",
        ],
        resources: [
          "React Context: https://react.dev/reference/react/Context",
          "Custom Hooks: https://react.dev/reference/react",
        ],
      },
      3: {
        title: "Build an Advanced React Form with Validation",
        description:
          "Create a complex form system with real-time validation, custom hooks, and dynamic field generation.",
        tasks: [
          "Build reusable form components with controlled inputs",
          "Implement form validation using custom hooks",
          "Add async validation with debouncing",
          "Create dynamic form field generation from schema",
          "Implement form submission with loading and error states",
        ],
        resources: [
          "React Forms: https://react.dev/reference/react-dom/components/form",
          "Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks",
        ],
      },
    },
    8: {
      1: {
        title: "Build a RESTful API with Node.js and Express",
        description:
          "Create a complete REST API with user authentication, data validation, and proper error handling.",
        tasks: [
          "Set up Express server with middleware configuration",
          "Implement JWT-based authentication system",
          "Create CRUD operations with data validation",
          "Add proper error handling and logging",
          "Implement rate limiting and security headers",
        ],
        resources: [
          "Express.js: https://expressjs.com/",
          "JWT Authentication: https://jwt.io/",
        ],
      },
      2: {
        title: "Create a Real-time Notification System",
        description:
          "Build a notification system using WebSocket connections with message queuing and delivery confirmation.",
        tasks: [
          "Implement WebSocket server with connection management",
          "Create message queuing system for offline users",
          "Add delivery confirmation and read receipts",
          "Implement notification categories and filtering",
          "Add real-time typing indicators and presence",
        ],
        resources: [
          "Socket.io: https://socket.io/",
          "WebSocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
        ],
      },
      3: {
        title: "Build a Microservices Architecture Demo",
        description:
          "Create a microservices application with multiple services, API gateway, and service communication.",
        tasks: [
          "Design microservices architecture with clear boundaries",
          "Implement API gateway for request routing",
          "Add inter-service communication using HTTP/REST",
          "Create service discovery and health checking",
          "Implement distributed logging and monitoring",
        ],
        resources: [
          "Microservices: https://microservices.io/",
          "API Gateway: https://aws.amazon.com/api-gateway/",
        ],
      },
    },
    9: {
      1: {
        title: "Design and Implement a Complete Database Schema",
        description:
          "Create a normalized database schema for an e-commerce system with proper relationships and constraints.",
        tasks: [
          "Design entity-relationship diagram for e-commerce domain",
          "Implement database normalization (1NF, 2NF, 3NF)",
          "Create SQL DDL scripts for schema creation",
          "Add indexes for performance optimization",
          "Implement database triggers and stored procedures",
        ],
        resources: [
          "Database Normalization: https://en.wikipedia.org/wiki/Database_normalization",
          "SQL Tutorial: https://www.w3schools.com/sql/",
        ],
      },
      2: {
        title: "Build a Multi-Database Application",
        description:
          "Create an application that uses both SQL and NoSQL databases for different data storage needs.",
        tasks: [
          "Design data partitioning strategy across databases",
          "Implement PostgreSQL for relational data",
          "Add MongoDB for document storage",
          "Create data synchronization between databases",
          "Implement backup and recovery procedures",
        ],
        resources: [
          "PostgreSQL: https://www.postgresql.org/docs/",
          "MongoDB: https://docs.mongodb.com/",
        ],
      },
      3: {
        title: "Create a Data Analytics Dashboard",
        description:
          "Build a real-time analytics dashboard with database optimization for large datasets and complex queries.",
        tasks: [
          "Design database schema for analytics data",
          "Implement data aggregation and ETL processes",
          "Create efficient queries with proper indexing",
          "Add real-time data streaming capabilities",
          "Build visualization components for analytics",
        ],
        resources: [
          "Data Warehousing: https://en.wikipedia.org/wiki/Data_warehouse",
          "ETL Processes: https://en.wikipedia.org/wiki/Extract,_transform,_load",
        ],
      },
    },
    10: {
      1: {
        title: "Build a Secure Authentication System",
        description:
          "Create a comprehensive authentication system with multiple security layers, password policies, and session management.",
        tasks: [
          "Implement secure password hashing with salt",
          "Add multi-factor authentication (2FA)",
          "Create session management with secure tokens",
          "Implement account lockout and rate limiting",
          "Add security headers and CSRF protection",
        ],
        resources: [
          "Password Security: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
          "OWASP Security: https://owasp.org/www-project-top-ten/",
        ],
      },
      2: {
        title: "Create a Security Audit Tool",
        description:
          "Build a tool that scans web applications for common security vulnerabilities and provides remediation recommendations.",
        tasks: [
          "Implement SQL injection detection",
          "Add XSS vulnerability scanning",
          "Create security header analysis",
          "Implement file upload security checks",
          "Generate comprehensive security reports",
        ],
        resources: [
          "OWASP Testing Guide: https://owasp.org/www-project-web-security-testing-guide/",
          "Security Headers: https://securityheaders.com/",
        ],
      },
      3: {
        title: "Build an Encrypted Communication System",
        description:
          "Create a secure messaging system with end-to-end encryption using modern cryptographic techniques.",
        tasks: [
          "Implement public-key cryptography for key exchange",
          "Add message encryption and decryption",
          "Create secure key management system",
          "Implement forward secrecy and perfect secrecy",
          "Add secure message storage and transmission",
        ],
        resources: [
          "Cryptography: https://en.wikipedia.org/wiki/Cryptography",
          "Public-key Cryptography: https://en.wikipedia.org/wiki/Public-key_cryptography",
        ],
      },
    },
    11: {
      1: {
        title: "Create a Real-time Notification System",
        description:
          "Build a notification system using WebSocket connections with message queuing and delivery confirmation.",
        tasks: [
          "Implement WebSocket server with connection management",
          "Create message queuing system for offline users",
          "Add delivery confirmation and read receipts",
          "Implement notification categories and filtering",
          "Add real-time typing indicators and presence",
        ],
        resources: [
          "Socket.io: https://socket.io/",
          "WebSocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
        ],
      },
      2: {
        title: "Build a Microservices Architecture Demo",
        description:
          "Create a microservices application with multiple services, API gateway, and service communication.",
        tasks: [
          "Design microservices architecture with clear boundaries",
          "Implement API gateway for request routing",
          "Add inter-service communication using HTTP/REST",
          "Create service discovery and health checking",
          "Implement distributed logging and monitoring",
        ],
        resources: [
          "Microservices: https://microservices.io/",
          "API Gateway: https://aws.amazon.com/api-gateway/",
        ],
      },
      3: {
        title: "Implement Node.js Performance Monitoring",
        description:
          "Build a comprehensive performance monitoring system for Node.js applications.",
        tasks: [
          "Set up application performance monitoring (APM)",
          "Implement custom metrics and tracing",
          "Create alerting system for performance degradation",
          "Add memory leak detection and profiling",
          "Implement distributed tracing across services",
        ],
        resources: [
          "Node.js Performance: https://nodejs.org/en/docs/guides/",
          "APM Best Practices: https://www.datadoghq.com/knowledge-center/apm/",
        ],
      },
    },
    12: {
      1: {
        title: "Build a Multi-Database Application",
        description:
          "Create an application that uses both SQL and NoSQL databases for different data storage needs.",
        tasks: [
          "Design data partitioning strategy across databases",
          "Implement PostgreSQL for relational data",
          "Add MongoDB for document storage",
          "Create data synchronization between databases",
          "Implement backup and recovery procedures",
        ],
        resources: [
          "PostgreSQL: https://www.postgresql.org/docs/",
          "MongoDB: https://docs.mongodb.com/",
        ],
      },
      2: {
        title: "Create a Database Migration System",
        description:
          "Build a robust database migration system with version control and rollback capabilities.",
        tasks: [
          "Design migration versioning system",
          "Implement forward and rollback migrations",
          "Add data validation and integrity checks",
          "Create migration history and audit trail",
          "Implement zero-downtime deployment strategy",
        ],
        resources: [
          "Database Migrations: https://sequelize.org/docs/v6/other-topics/migrations/",
          "Migration Best Practices: https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-sequelize-to-prisma",
        ],
      },
      3: {
        title: "Build a Database Analytics Dashboard",
        description:
          "Create a real-time analytics dashboard with database optimization for large datasets and complex queries.",
        tasks: [
          "Design database schema for analytics data",
          "Implement data aggregation and ETL processes",
          "Create efficient queries with proper indexing",
          "Add real-time data streaming capabilities",
          "Build visualization components for analytics",
        ],
        resources: [
          "Data Warehousing: https://en.wikipedia.org/wiki/Data_warehouse",
          "ETL Processes: https://en.wikipedia.org/wiki/Extract,_transform,_load",
        ],
      },
    },
    13: {
      1: {
        title: "Build a Microservices Architecture Demo",
        description:
          "Create a microservices application with multiple services, API gateway, and service communication.",
        tasks: [
          "Design microservices architecture with clear boundaries",
          "Implement API gateway for request routing",
          "Add inter-service communication using HTTP/REST",
          "Create service discovery and health checking",
          "Implement distributed logging and monitoring",
        ],
        resources: [
          "Microservices: https://microservices.io/",
          "API Gateway: https://aws.amazon.com/api-gateway/",
        ],
      },
      2: {
        title: "Create a GraphQL API with Federation",
        description:
          "Build a federated GraphQL API that combines multiple data sources into a unified schema.",
        tasks: [
          "Design GraphQL schema for multiple services",
          "Implement Apollo Federation",
          "Add resolver composition and data stitching",
          "Create type safety with code generation",
          "Implement subscription and real-time features",
        ],
        resources: [
          "Apollo Federation: https://www.apollographql.com/docs/federation/",
          "GraphQL: https://graphql.org/learn/",
        ],
      },
      3: {
        title: "Build an API Rate Limiting System",
        description:
          "Create a sophisticated rate limiting system with multiple algorithms and user tiers.",
        tasks: [
          "Implement sliding window and token bucket algorithms",
          "Add user-tier-based rate limiting",
          "Create distributed rate limiting with Redis",
          "Implement rate limit headers and analytics",
          "Add graceful degradation and circuit breakers",
        ],
        resources: [
          "Rate Limiting Algorithms: https://en.wikipedia.org/wiki/Rate_limiting",
          "Redis: https://redis.io/documentation",
        ],
      },
    },
    14: {
      1: {
        title: "Conduct Comprehensive User Research",
        description:
          "Plan and execute a complete user research study including interviews, surveys, and usability testing.",
        tasks: [
          "Define research objectives and user personas",
          "Create interview and survey questions",
          "Recruit and conduct user interviews",
          "Analyze data and identify key insights",
          "Present findings with actionable recommendations",
        ],
        resources: [
          "User Research Methods: https://www.nngroup.com/articles/ux-research-cheat-sheet/",
          "Interview Guide: https://www.uxmatters.com/authors/mike-kuni/2020/01/07/ux-interview-questions",
        ],
      },
      2: {
        title: "Design Information Architecture",
        description:
          "Create a comprehensive information architecture for a complex website or application.",
        tasks: [
          "Conduct card sorting exercises with users",
          "Create site maps and navigation hierarchies",
          "Design labeling systems and taxonomy",
          "Implement search functionality and filters",
          "Test and iterate on the information architecture",
        ],
        resources: [
          "Information Architecture: https://www.boxesandarrows.com/",
          "Card Sorting: https://www.nngroup.com/articles/card-sorting/",
        ],
      },
      3: {
        title: "Create a User Journey Map",
        description:
          "Design detailed user journey maps that capture the complete experience across touchpoints.",
        tasks: [
          "Map user goals and pain points",
          "Identify key touchpoints and interactions",
          "Document emotional states throughout the journey",
          "Highlight opportunities for improvement",
          "Present insights to stakeholders with recommendations",
        ],
        resources: [
          "Journey Mapping: https://www.nngroup.com/articles/ux-design-cheat-sheet/",
          "User Journey Templates: https://www.smashingmagazine.com/2015/01/designing-effective-print-and-web-forms/",
        ],
      },
    },
    15: {
      1: {
        title: "Create a Complete Brand Identity System",
        description:
          "Design a comprehensive brand identity including logo, color palette, typography, and style guide.",
        tasks: [
          "Research brand positioning and target audience",
          "Create logo concepts and refine final design",
          "Develop color palette with psychological considerations",
          "Select and pair typography for brand voice",
          "Document brand guidelines in style guide",
        ],
        resources: [
          "Brand Identity Design: https://www.canva.com/learn/brand-identity-design/",
          "Color Theory: https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm",
        ],
      },
      2: {
        title: "Design a Design System",
        description:
          "Build a comprehensive design system with components, guidelines, and documentation.",
        tasks: [
          "Audit existing design patterns and components",
          "Create component library with variations",
          "Define design tokens (colors, typography, spacing)",
          "Write component documentation and usage guidelines",
          "Implement design system in code",
        ],
        resources: [
          "Design Systems: https://www.designbetter.co/design-systems-handbook",
          "Component Libraries: https://storybook.js.org/",
        ],
      },
      3: {
        title: "Create an Accessibility-Focused Design",
        description:
          "Design a website or application that meets WCAG accessibility guidelines.",
        tasks: [
          "Implement WCAG 2.1 AA compliance",
          "Design for screen readers and keyboard navigation",
          "Create high contrast and scalable interfaces",
          "Test with assistive technologies",
          "Document accessibility considerations",
        ],
        resources: [
          "WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/",
          "Accessibility Design: https://webaim.org/articles/",
        ],
      },
    },
    16: {
      1: {
        title: "Build and Test an Interactive Prototype",
        description:
          "Create a high-fidelity interactive prototype and conduct user testing to validate design decisions.",
        tasks: [
          "Create interactive prototype using Figma or similar tool",
          "Define user testing scenarios and success metrics",
          "Recruit participants for usability testing",
          "Conduct moderated testing sessions",
          "Analyze results and iterate on design",
        ],
        resources: [
          "Prototyping Tools: https://www.figma.com/prototyping/",
          "Usability Testing: https://www.nngroup.com/articles/usability-testing-101/",
        ],
      },
      2: {
        title: "Conduct A/B Testing Study",
        description:
          "Design and execute an A/B test to compare two design variations and measure their effectiveness.",
        tasks: [
          "Define hypothesis and success metrics",
          "Create two design variations to test",
          "Set up A/B testing framework and analytics",
          "Run test with sufficient sample size",
          "Analyze results and implement winning design",
        ],
        resources: [
          "A/B Testing: https://www.optimizely.com/optimization-glossary/ab-testing/",
          "Statistical Significance: https://www.optimizely.com/optimization-glossary/statistical-significance/",
        ],
      },
      3: {
        title: "Create a Design Testing Framework",
        description:
          "Build a comprehensive framework for ongoing design validation and continuous improvement.",
        tasks: [
          "Define design testing methodologies",
          "Create testing templates and checklists",
          "Implement automated testing tools",
          "Set up feedback collection systems",
          "Establish metrics for design quality",
        ],
        resources: [
          "Design Testing: https://www.designcouncil.org.uk/our-work/skills-learning/tools-frameworks/design-testing/",
          "Continuous Design: https://uxdesign.cc/continuous-design-b8a6e7c9c2ea",
        ],
      },
    },
  };

  const assignment = assignments[Number(courseId)]?.[Number(lessonId)];

  // Debugging info to help identify why assignments may not render
  console.log("Assignments debug:", {
    courseId,
    lessonId,
    courseIdNum: Number(courseId),
    lessonIdNum: Number(lessonId),
    subscriptionRaw,
    subscription,
    isPremium,
    assignmentExists: !!assignments[Number(courseId)]?.[Number(lessonId)],
  });

  // Show message for free users if accessing advanced lessons (courseId >= 5)
  if (!isPremium && Number(courseId) >= 5) {
    return (
      <div className="container">
        <h1>Premium Feature</h1>
        <p>
          Assignments for advanced web development lessons are only available
          for Premium subscribers.
          <br />
          Upgrade to Premium to access all advanced assignments and features.
        </p>
        <button
          className="btn"
          onClick={() => navigate("/pricing")}
          style={{ marginTop: "1rem" }}
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  // Show message if assignment data is missing
  if (!assignment) {
    const courseAssignments = assignments[Number(courseId)] || {};
    const available = Object.keys(courseAssignments || {}).map((id) => ({
      id,
      title: courseAssignments[id].title,
    }));

    if (isPremium) {
      return (
        <div className="container">
          <h1>Assignment Not Created</h1>
          <p>
            The specific assignment for this lesson hasn't been created yet.
            Below are the available assignments for this course — you can select
            one, or report the missing assignment to the team.
          </p>

          {available.length > 0 ? (
            <div className="card" style={{ marginTop: "1rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                Available Assignments
              </h2>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {available.map((a) => (
                  <li key={a.id} style={{ marginBottom: "0.5rem" }}>
                    <Link
                      to={`/assignments/${courseId}/${a.id}`}
                      style={{ color: "#207985", textDecoration: "none" }}
                    >
                      {a.title} (Lesson {a.id})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ marginTop: "1rem" }}>
              No assignments exist for this course yet.
            </p>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            <button
              className="btn"
              onClick={() =>
                window.open(
                  "mailto:hello@coursecode.example?subject=Missing%20Assignment&body=Please%20create%20assignment%20for%20course%20" +
                    courseId +
                    "%20lesson%20" +
                    lessonId
                )
              }
            >
              Report Missing Assignment
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <h1>Assignment Not Available</h1>
        <p>
          The assignment for this lesson is not available yet or is incomplete.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        {assignment.title}
      </h1>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Description
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          {assignment.description}
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
          Tasks
        </h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {assignment.tasks.map((task, index) => (
            <li
              key={index}
              style={{
                marginBottom: "0.5rem",
                fontSize: "1rem",
                lineHeight: "1.4",
              }}
            >
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Resources
        </h2>
        <ul style={{ paddingLeft: "1.5rem" }}>
          {assignment.resources.map((resource, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              <a
                href={resource}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#207985", textDecoration: "none" }}
              >
                {resource}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Ready to Submit?
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          Once you've completed the assignment, enter the URL path to your
          project and submit it for review.
        </p>
        <input
          type="url"
          placeholder="https://github.com/username/project or https://vercel/username/pen/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "90%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />
        <button
          className="btn"
          onClick={() => {
            if (url.trim()) {
              // Save submission to localStorage
              const submissions = JSON.parse(
                localStorage.getItem("assignment-submissions") || "{}"
              );
              submissions[`${courseId}-${lessonId}`] = {
                url: url.trim(),
                submittedAt: new Date().toISOString(),
              };
              localStorage.setItem(
                "assignment-submissions",
                JSON.stringify(submissions)
              );
              alert(
                "Assignment submitted! Your instructor will review it soon."
              );
              setUrl("");
            } else {
              alert("Please enter a valid URL.");
            }
          }}
        >
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default Assignments;
