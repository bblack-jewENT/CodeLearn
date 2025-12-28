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

  // Mock lesson data with enhanced content
  const lessonData = {
    1: {
      title: "HTML Basics",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🎯 The Birth of the Web (1989-1991)</h3>
            <p>
              Picture this: You're Tim Berners-Lee, working at CERN in
              Switzerland. You've got this crazy idea to connect all the
              research documents together using "hyperlinks" - links that jump
              between documents. Sound familiar? That's exactly how the World
              Wide Web was born!
            </p>
            <div className="fun-fact">
              <strong>🎪 Fun Fact:</strong> The first website ever created was
              about the World Wide Web project itself! You can still view it at
              the World Wide Web Consortium's website.
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🏷️ HTML Gets Tagged (1991-1993)</h3>
            <p>
              HTML was initially called "SGML for the web" - but that was way
              too complicated! So Tim simplified it into a "markup language" -
              basically adding special tags around text to give it structure and
              meaning.
            </p>
            <div className="code-example">
              <pre>
                <code>
                  <h1>This is a heading</h1> <p>This is a paragraph</p>
                </code>
              </pre>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🌟 The Browser Wars Begin (1993-1995)</h3>
            <p>
              Suddenly, everyone wanted to create browsers! Mosaic, Netscape
              Navigator, Internet Explorer - each trying to "interpret" HTML
              their own way. This led to the infamous "Browser Wars" where
              developers had to write different code for different browsers!
            </p>
            <div className="historical-note">
              <strong>📰 Historical Note:</strong> In 1995, both Netscape
              Navigator and Internet Explorer had different implementations of
              the same HTML tags - developers had to choose which browser to
              "break"!
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 Modern HTML (1997-Present)</h3>
            <p>
              HTML has evolved from just basic text structure to supporting
              multimedia, animations, forms, and much more. Today's HTML5 can
              handle everything from simple text to complex web applications!
            </p>
          </div>
        </div>
      ),
      overview:
        "In this lesson, we'll explore the fundamentals of HTML including tags, elements, attributes, and document structure. We'll take a journey through the history of the web and learn how HTML became the backbone of the internet!",
      videoId: "UB1O30fR-EE",
    },
    2: {
      title: "CSS Styling",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🎨 The Style Crisis of the 90s</h3>
            <p>
              Imagine being a web designer in 1995. You had HTML for structure,
              but every single piece of styling had to be done with HTML tags.
              Want a red text? You'd use <code>&lt;font color="red"&gt;</code>.
              Wanted bold text? <code>&lt;b&gt;</code>! This was a designer's
              nightmare!
            </p>
            <div className="code-nightmare">
              <pre>
                <code>
                  <font face="Arial" size="12" color="blue">
                    <b>Styled Text</b>{" "}
                  </font>
                </code>
              </pre>
              <p className="caption">😱 This was actual web design in 1995!</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🧙‍♂️ Håkon's Magic Solution (1994)</h3>
            <p>
              Enter Håkon Wium Lie, a Norwegian computer scientist who had this
              radical idea: "What if we separated content from design?" While
              working with Tim Berners-Lee at CERN, he proposed "Cascading Style
              Sheets" - a way to keep HTML clean and handle all styling
              separately.
            </p>
            <div className="innovation-highlight">
              <strong>💡 The Lightbulb Moment:</strong> Håkon realized that web
              pages could maintain the same HTML structure but look completely
              different through CSS - just like how a newspaper can be printed
              in black & white or full color!
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🔥 Browser Support Drama (1996-2000)</h3>
            <p>
              CSS Level 1 became official in 1996, but browsers were sloooow to
              support it. Internet Explorer 3 had "partial" CSS support that was
              mostly broken! Web developers had to create CSS that worked AND
              create HTML fallbacks for older browsers.
            </p>
            <div className="browser-war">
              <div className="browser-icon">IE3</div>
              <span>vs</span>
              <div className="browser-icon">CSS</div>
              <span>Result:</span>
              <div className="loser">😵 Nightmare Mode Activated</div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎯 CSS Gets Super Powers (2000-2010)</h3>
            <p>
              CSS2 in 1998 added positioning and media types. But the real
              game-changer? CSS3 (starting 1999) brought us animations,
              transitions, gradients, and flexbox. Suddenly, web designers could
              create animations without JavaScript!
            </p>
            <div className="evolution-demo">
              <div className="css-box">Basic</div>
              <div className="css-box animated">With Animations!</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "This lesson covers CSS syntax, selectors, properties, and the box model. You'll discover how CSS saved web design from the chaos of HTML styling tags and learn to create beautiful, responsive websites.",
      videoId: "yfoY53QXEnI",
    },
    3: {
      title: "JavaScript Fundamentals",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>⚡ The 10-Day Miracle (1995)</h3>
            <p>
              Brendan Eich at Netscape had just 10 days to create a programming
              language for the web. He was like, "I'll create something that
              looks like Java but runs in the browser!" - and thus, JavaScript
              was born in a caffeine-fueled coding marathon!
            </p>
            <div className="timeline-wow">
              <strong>🤯 Mind = Blown:</strong> JavaScript was created in about
              10 days, yet it's still powering most of the web today!
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎭 The Name Game (Mocha → LiveScript → JavaScript)</h3>
            <p>
              First it was called "Mocha," then "LiveScript," but then Netscape
              made a deal with Sun Microsystems. Sun said, "Hey, we have this
              popular language called Java. Why don't you rename it to
              JavaScript?" - even though they're completely different languages!
            </p>
            <div className="confusion-note">
              <div className="lang-comparison">
                <div className="lang-box">
                  <h4>Java</h4>
                  <code>public static void main(String[] args) {"{"}</code>
                </div>
                <div className="vs">VS</div>
                <div className="lang-box">
                  <h4>JavaScript</h4>
                  <code>
                    function main() {"{"} console.log("Hi!"); {"}"}
                  </code>
                </div>
              </div>
              <p className="caption">
                Same family name, totally different languages! 😄
              </p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🏛️ The Standards Game (1997)</h3>
            <p>
              After Microsoft created their own version called "JScript,"
              everyone realized they needed to standardize. So they created
              ECMAScript - the official standard for JavaScript. Think of
              ECMAScript as the "recipe" and JavaScript as the "dish" different
              companies serve!
            </p>
            <div className="standardization-demo">
              <div className="recipe-box">
                <h4>📋 ECMAScript Standard</h4>
                <p>The official recipe</p>
              </div>
              <div className="chef-box">
                <h4>👨‍🍳 JavaScript Implementation</h4>
                <p>How each browser "cooks" it</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 The Renaissance (2005-Present)</h3>
            <p>
              From being just "that thing that makes popups," JavaScript
              exploded into everything: Ajax made websites feel instant, Node.js
              brought JavaScript to servers, and modern frameworks like React,
              Vue, and Angular created entire ecosystems!
            </p>
            <div className="evolution-showcase">
              <div className="evolution-stage">
                <span className="stage">1.0</span>
                <span>Popups & Alerts</span>
              </div>
              <div className="evolution-stage">
                <span className="stage">2.0</span>
                <span>AJAX & Dynamic Content</span>
              </div>
              <div className="evolution-stage">
                <span className="stage">3.0</span>
                <span>Node.js & Server-Side</span>
              </div>
              <div className="evolution-stage">
                <span className="stage">4.0</span>
                <span>Frameworks & Apps</span>
              </div>
            </div>
          </div>
        </div>
      ),
      overview:
        "We'll cover JavaScript basics including variables, data types, functions, and control structures. Discover the fascinating story of how a 10-day creation became the backbone of modern web development!",
      videoId: "W6NZfCO5SIk",
    },
    4: {
      title: "React Components",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>😱 The Facebook Problem (2011-2013)</h3>
            <p>
              Imagine managing Facebook's news feed - millions of users,
              constantly updating content, and you need to re-render everything
              efficiently. Traditional DOM manipulation was getting sloooow and
              complex. Something had to change!
            </p>
            <div className="problem-demo">
              <div className="dom-comparison">
                <div className="old-way">
                  <h4>🚫 The Old Way</h4>
                  <p>Manipulate DOM directly = Slow & Messy</p>
                </div>
                <div className="new-way">
                  <h4>✨ React Way</h4>
                  <p>Describe what you want = Fast & Clean</p>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎭 The Component Revelation (2013)</h3>
            <p>
              Jordan Walke at Facebook had an epiphany: "What if we broke down
              UI into tiny, reusable pieces?" - like LEGO blocks! Each component
              would be independent, reusable, and easy to test. This was
              revolutionary!
            </p>
            <div className="lego-analogy">
              <div className="lego-piece">Header</div>
              <div className="lego-piece">Button</div>
              <div className="lego-piece">Card</div>
              <div className="lego-piece">Footer</div>
              <p className="caption">Build websites like LEGO! 🧱</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🔮 The Virtual DOM Magic</h3>
            <p>
              React introduced the Virtual DOM - basically a "practice version"
              of the real DOM. When data changes, React first updates the
              Virtual DOM, compares it with the previous version, and only
              updates what's actually changed on the real page. It's like a
              smart assistant who only does the necessary work!
            </p>
            <div className="virtual-dom-demo">
              <div className="dom-layer">
                <span className="label">Virtual DOM (Fast Updates!)</span>
                <div className="virtual-content">
                  <div className="content-box">User Name</div>
                  <div className="content-box">Like Count</div>
                </div>
              </div>
              <div className="arrow">⚡</div>
              <div className="dom-layer">
                <span className="label">Real DOM (Minimal Changes!)</span>
                <div className="real-content">
                  <div className="content-box updated">John Doe</div>
                  <div className="content-box">42 Likes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🌟 The Revolution Spreads (2013-Present)</h3>
            <p>
              Once React proved its worth at Facebook and Instagram, other
              companies started adopting it. Airbnb, Netflix, Uber - everyone
              wanted to be "React-friendly." Now React is everywhere, from
              simple websites to complex mobile apps!
            </p>
            <div className="adoption-timeline">
              <div className="adoption-point">2013: React Created</div>
              <div className="adoption-point">2014: Instagram Acquired</div>
              <div className="adoption-point">2015: React Native Launched</div>
              <div className="adoption-point">
                2020: Hooks Revolutionized State
              </div>
              <div className="adoption-point">Today: React Everywhere! 🌍</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "This lesson introduces React concepts including components, JSX, props, state, and hooks. Discover how Facebook's solution to complex UIs became the most popular frontend library in the world!",
      videoId: "Ke90Tje7VS0",
    },
    5: {
      title: "Advanced CSS & Modern Layout",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🎨 The Table Layout Era (1996-2006)</h3>
            <p>
              Back in the day, web designers used HTML tables for everything -
              navigation, layout, even entire websites! Want a two-column
              layout? Use a table with two cells! It was messy, slow, and
              frustrating.
            </p>
            <div className="code-nightmare">
              <pre>
                <code>
                  <table>
                    <tr>
                      <td>Navigation</td>
                      <td>Content</td>
                    </tr>
                  </table>
                </code>
              </pre>
              <p className="caption">
                😱 Tables were used for LAYOUTS, not data!
              </p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🧹 The Great Clean-Up (2006-2010)</h3>
            <p>
              Web standards advocates fought hard to separate content from
              design. "No more tables for layout!" they shouted. CSS positioning
              and floats became the heroes, but float-based layouts were like
              building with Jenga blocks - everything fell apart if you weren't
              careful!
            </p>
            <div className="float-demo">
              <div className="float-box left">Float Left</div>
              <div className="float-box right">Float Right</div>
              <p>Content flows around floated elements...</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⚡ Flexbox Revolution (2012-2017)</h3>
            <p>
              In 2009, the Flexbox spec was introduced, but it took years for
              browsers to support it. Finally, web designers had a proper tool
              for one-dimensional layouts! No more clearing floats or
              calculating percentages for centering elements!
            </p>
            <div className="flexbox-demo">
              <div className="flex-container">
                <div className="flex-item">1</div>
                <div className="flex-item">2</div>
                <div className="flex-item">3</div>
              </div>
              <p className="caption">
                ✨ Perfect centering with just 3 lines of CSS!
              </p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎯 Grid System Mastery (2017-Present)</h3>
            <p>
              CSS Grid arrived in 2017, giving us two-dimensional layouts!
              Suddenly, we could create magazine-quality layouts with ease. The
              future of web design had arrived, and it was beautiful!
            </p>
            <div className="grid-demo">
              <div className="grid-container">
                <div className="grid-item header">Header</div>
                <div className="grid-item sidebar">Sidebar</div>
                <div className="grid-item main">Main Content</div>
                <div className="grid-item aside">Aside</div>
                <div className="grid-item footer">Footer</div>
              </div>
              <p className="caption">
                🎨 Magazine layouts are now possible with CSS alone!
              </p>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master advanced CSS techniques including Flexbox, CSS Grid, custom properties, animations, and modern layout patterns. Transform from a CSS beginner to a layout master!",
      videoId: "yfoY53QXEnI",
    },
    6: {
      title: "ES6+ & Modern JavaScript",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🐌 The JavaScript Dark Ages (1995-2015)</h3>
            <p>
              For 20 years, JavaScript remained largely unchanged. Developers
              wrote <code>var</code>, created functions with{" "}
              <code>function</code> keywords, and managed callbacks like a stack
              of paper plates - one wrong move and everything would tumble down!
            </p>
            <div className="callback-hell">
              <pre>
                <code>
                  getUser(id, function(user) {"{"}
                  getOrders(user.id, function(orders) {"{"}
                  getOrderDetails(orders[0].id, function(details) {"{"}
                  // Welcome to Callback Hell! 😈
                  {"}"}){"}"}){"}"})
                </code>
              </pre>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 The ES6 Explosion (2015)</h3>
            <p>
              ECMAScript 2015 (ES6) changed everything! In one massive update,
              JavaScript got modern syntax: <code>let</code> and{" "}
              <code>const</code>, arrow functions, classes, template literals,
              and modules. It was like JavaScript got a complete makeover!
            </p>
            <div className="es6-comparison">
              <div className="old-way">
                <h4>Old JavaScript (ES5)</h4>
                <code>var name = "John";</code>
                <br />
                <code>
                  function greet(name) {"{"} return "Hello " + name; {"}"}
                </code>
              </div>
              <div className="new-way">
                <h4>Modern JavaScript (ES6+)</h4>
                <code>const name = "John";</code>
                <br />
                <code>const greet = (name) =&gt; `Hello ${name}`;</code>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⏰ Asynchronous Revolution (2017-2018)</h3>
            <p>
              First came Promises to escape callback hell, then{" "}
              <code>async/await</code> in 2017 made asynchronous code look
              synchronous! No more nested callbacks - just clean, readable code
              that flows like a river.
            </p>
            <div className="async-demo">
              <div className="async-comparison">
                <div className="promise-way">
                  <h4>🔥 With Promises</h4>
                  <code>getUser().then(user =&gt; getOrders(user.id))</code>
                </div>
                <div className="async-await-way">
                  <h4>✨ With async/await</h4>
                  <code>const user = await getUser();</code>
                  <br />
                  <code>const orders = await getOrders(user.id);</code>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎯 Modern JavaScript Today (2018-Present)</h3>
            <p>
              JavaScript now gets yearly updates with features like optional
              chaining (<code>?.</code>), nullish coalescing (<code>??</code>),
              top-level await, and more. JavaScript has evolved from a "toy
              language" to a powerhouse that runs everywhere!
            </p>
            <div className="modern-features">
              <div className="feature">
                Optional Chaining: <code>user?.profile?.name</code>
              </div>
              <div className="feature">
                Nullish Coalescing: <code>value ?? "default"</code>
              </div>
              <div className="feature">
                BigInt: <code>123n</code>
              </div>
              <div className="feature">
                Private Fields: <code>#privateMethod()</code>
              </div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Dive deep into modern JavaScript (ES6+) features including destructuring, modules, async/await, classes, and cutting-edge features. Write cleaner, more efficient JavaScript code!",
      videoId: "W6NZfCO5SIk",
    },
    7: {
      title: "Advanced React & Performance",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🏗️ Beyond Basic Components (2013-2015)</h3>
            <p>
              React's component system was revolutionary, but early developers
              quickly hit limits. How do components communicate? How do you
              share data across many components? The solution? Context API and
              higher-order components!
            </p>
            <div className="react-evolution">
              <div className="stage">
                <strong>Class Components</strong>
                <code>class MyComponent extends React.Component</code>
              </div>
              <div className="arrow">➡️</div>
              <div className="stage">
                <strong>Functional + Hooks</strong>
                <code>const MyComponent = () =&gt; useState()</code>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⚓ The Hooks Revolution (2018)</h3>
            <p>
              In 2018, React introduced Hooks - functions that let you use state
              and other React features without classes. <code>useState</code>,{" "}
              <code>useEffect</code>, <code>useContext</code> - suddenly,
              functional components became super powerful!
            </p>
            <div className="hooks-demo">
              <div className="hook-example">
                <code>const [count, setCount] = useState(0);</code>
                <code>
                  useEffect(() =&gt; document.title = count, [count]);
                </code>
                <code>const theme = useContext(ThemeContext);</code>
              </div>
              <p className="caption">
                🚀 Hooks made React functional components incredibly powerful!
              </p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⚡ Performance Optimization Challenge</h3>
            <p>
              As React apps grew bigger, performance became crucial. Developers
              discovered memoization with <code>React.memo</code>,{" "}
              <code>useMemo</code>, and <code>useCallback</code>. Plus, React's
              reconciliation algorithm became smarter with concurrent rendering!
            </p>
            <div className="performance-demo">
              <div className="optimization-types">
                <div className="opt-type">
                  <strong>Code Splitting</strong>
                  <code>lazy(() =&gt; import('./Heavy'))</code>
                </div>
                <div className="opt-type">
                  <strong>Memoization</strong>
                  <code>memo(ExpensiveComponent)</code>
                </div>
                <div className="opt-type">
                  <strong>Virtual Scrolling</strong>
                  <code>react-window</code>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🌟 The React Ecosystem (2018-Present)</h3>
            <p>
              Today, React powers everything from simple websites to complex
              applications like Facebook, Instagram, and Netflix. With React
              Native, the same knowledge extends to mobile apps. React truly
              conquered the frontend world!
            </p>
            <div className="ecosystem-showcase">
              <div className="tech-stack">
                <div className="stack-item">React</div>
                <div className="stack-item">Next.js</div>
                <div className="stack-item">React Native</div>
                <div className="stack-item">Remix</div>
                <div className="stack-item">Gatsby</div>
              </div>
              <p className="caption">
                🌍 React ecosystem spans web, mobile, and beyond!
              </p>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master advanced React concepts including Hooks, Context, performance optimization, code splitting, and React ecosystem tools. Build scalable, high-performance React applications!",
      videoId: "Ke90Tje7VS0",
    },
    8: {
      title: "Backend Development & APIs",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🖥️ The Server-Side Renaissance (1995-2005)</h3>
            <p>
              In the early web, servers ruled everything! Every webpage was
              generated by servers using Perl, PHP, ASP, or CGI scripts. The
              browser was just a "dumb" display device that showed what the
              server sent. Simple times!
            </p>
            <div className="server-architecture">
              <div className="server-box">Server</div>
              <div className="arrow">➡️</div>
              <div className="html-box">HTML Page</div>
              <div className="arrow">➡️</div>
              <div className="browser-box">Browser</div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🔌 The AJAX Revolution (2005-2010)</h3>
            <p>
              Google's Gmail proved it was possible - dynamic web apps without
              page refreshes! XMLHttpRequest changed everything. Suddenly,
              browsers could fetch data in the background and update the page.
              The age of Web 2.0 had begun!
            </p>
            <div className="ajax-demo">
              <div className="ajax-comparison">
                <div className="old-web">
                  <strong>Old Way: Full Page Load</strong>
                  <p>👆 Click → Wait → New Page</p>
                </div>
                <div className="new-web">
                  <strong>AJAX Way: Dynamic Updates</strong>
                  <p>👆 Click → Background fetch → Instant update</p>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎯 The API Economy (2010-2015)</h3>
            <p>
              Companies realized they could expose their data through APIs
              (Application Programming Interfaces). Twitter API, Facebook Graph
              API, Google Maps API - suddenly, anyone could build apps using
              existing services!
            </p>
            <div className="api-showcase">
              <div className="api-provider">
                <strong>Twitter API</strong>
                <code>
                  GET /users/{"{"}user_id{"}"}/tweets
                </code>
              </div>
              <div className="api-provider">
                <strong>Google Maps API</strong>
                <code>GET /maps/api/geocode/json</code>
              </div>
              <div className="api-provider">
                <strong>Stripe API</strong>
                <code>POST /v1/charges</code>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>☁️ Cloud & Microservices Era (2015-Present)</h3>
            <p>
              Modern backend development shifted to cloud services and
              microservices. AWS, Docker, Kubernetes, serverless functions -
              developers now build scalable, distributed systems that can handle
              millions of users globally!
            </p>
            <div className="modern-backend">
              <div className="backend-stack">
                <div className="service">Authentication</div>
                <div className="service">Database</div>
                <div className="service">API Gateway</div>
                <div className="service">File Storage</div>
                <div className="service">Analytics</div>
              </div>
              <p className="caption">
                ☁️ Modern backends are built from cloud services!
              </p>
            </div>
          </div>
        </div>
      ),
      overview:
        "Explore backend development with Node.js, databases, REST APIs, authentication, and cloud services. Learn to build robust, scalable server-side applications!",
      videoId: "rOpEN1JDaD0",
    },
    9: {
      title: "Database Design & Management",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>📊 The Punch Card Era (1960s-1980s)</h3>
            <p>
              Before databases, companies used punch cards and file systems to
              store data. Each application had its own files, and sharing data
              between programs was nearly impossible. It was the digital stone
              age!
            </p>
            <div className="database-evolution">
              <div className="era">
                <strong>Punch Cards</strong>
                <p>🔳 Physical holes store data</p>
              </div>
              <div className="era">
                <strong>File Systems</strong>
                <p>📁 Data in separate files</p>
              </div>
              <div className="era">
                <strong>Databases</strong>
                <p>🗄️ Centralized data management</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🏗️ The Relational Revolution (1970s-1990s)</h3>
            <p>
              Edgar Codd's relational database theory changed everything!
              Instead of storing data in files, why not store it in tables with
              relationships? SQL became the universal language for querying
              structured data. This was computer science gold!
            </p>
            <div className="sql-demo">
              <div className="sql-example">
                <pre>
                  <code>
                    SELECT users.name, orders.total FROM users JOIN orders ON
                    users.id = orders.user_id WHERE orders.total &gt; 100;
                  </code>
                </pre>
                <p className="caption">
                  💎 SQL: The language that ruled databases for 50+ years
                </p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>📈 The Big Data Challenge (2000s-2010s)</h3>
            <p>
              As the internet exploded, traditional databases couldn't handle
              the massive scale! Google and others pioneered NoSQL databases -
              not just tables, but key-value stores, document databases, and
              graph databases. Big data required big solutions!
            </p>
            <div className="database-types">
              <div className="db-type">
                <strong>Relational</strong>
                <p>📋 Structured tables</p>
                <small>MySQL, PostgreSQL, SQL Server</small>
              </div>
              <div className="db-type">
                <strong>Document</strong>
                <p>📄 JSON-like documents</p>
                <small>MongoDB, CouchDB</small>
              </div>
              <div className="db-type">
                <strong>Key-Value</strong>
                <p>🔑 Simple key-value pairs</p>
                <small>Redis, DynamoDB</small>
              </div>
              <div className="db-type">
                <strong>Graph</strong>
                <p>🕸️ Nodes and relationships</p>
                <small>Neo4j, Amazon Neptune</small>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⚡ Modern Database Innovation (2015-Present)</h3>
            <p>
              Today's databases combine the best of both worlds - SQL query
              power with NoSQL flexibility! Cloud databases automatically scale,
              multi-region replication ensures global availability, and
              real-time analytics run on streaming data!
            </p>
            <div className="modern-database">
              <div className="cloud-features">
                <div className="feature">Auto-scaling</div>
                <div className="feature">Multi-region</div>
                <div className="feature">Real-time</div>
                <div className="feature">Serverless</div>
                <div className="feature">AI-powered</div>
              </div>
              <p className="caption">
                🚀 Modern databases are intelligent and self-managing!
              </p>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master database fundamentals including relational design, SQL, NoSQL databases, normalization, and modern database technologies. Build efficient, scalable data architectures!",
      videoId: "6V4miYuD4lA",
    },
    10: {
      title: "Web Security & Best Practices",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🔓 The Wild West Web (1990s)</h3>
            <p>
              Early web developers had bigger fish to fry than security - just
              making websites work was hard enough! The internet was a friendly
              place where websites trusted users and users trusted websites.
              This innocence wouldn't last forever...
            </p>
            <div className="security-evolution">
              <div className="era Innocence">
                <strong>1990s</strong>
                <p>🤝 "We all trust each other!"</p>
              </div>
              <div className="era Warning">
                <strong>2000s</strong>
                <p>⚠️ "Wait, people are mean..."</p>
              </div>
              <div className="era Defense">
                <strong>2010s+</strong>
                <p>🛡️ "Security first!"</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>💉 The Injection Attacks Wake-Up Call</h3>
            <p>
              SQL injection attacks taught the world a harsh lesson: never trust
              user input! Attackers could execute malicious SQL commands through
              forms. The famous "Little Bobby Tables" comic summed it up
              perfectly - input validation became crucial!
            </p>
            <div className="injection-demo">
              <div className="vulnerable-code">
                <strong>❌ Vulnerable:</strong>
                <code>
                  query = "SELECT * FROM users WHERE name = '" + userInput + "'"
                </code>
                <p>
                  Attack: <code>'; DROP TABLE users; --</code>
                </p>
              </div>
              <div className="safe-code">
                <strong>✅ Safe:</strong>
                <code>query = "SELECT * FROM users WHERE name = ?"</code>
                <p>Use prepared statements!</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🔐 The Authentication Revolution</h3>
            <p>
              Passwords alone weren't enough anymore. Multi-factor
              authentication, OAuth, JWT tokens - the web learned to verify
              identity properly. Now we even have passwordless authentication
              using biometrics and hardware keys!
            </p>
            <div className="auth-evolution">
              <div className="auth-method">
                <strong>Password</strong>
                <p>🔑 Something you know</p>
              </div>
              <div className="auth-method">
                <strong>2FA</strong>
                <p>📱 Something you have</p>
              </div>
              <div className="auth-method">
                <strong>Biometric</strong>
                <p>👁️ Something you are</p>
              </div>
              <div className="auth-method">
                <strong>Hardware Key</strong>
                <p>🔐 Something physical</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🛡️ Modern Security Practices (2010s-Present)</h3>
            <p>
              Today's web security is sophisticated: HTTPS everywhere, Content
              Security Policy, automated security scanning, penetration testing,
              and secure-by-design principles. We learned that security isn't
              optional - it's essential!
            </p>
            <div className="security-layers">
              <div className="security-layer">
                <strong>Network Layer</strong>
                <p>HTTPS, Firewalls</p>
              </div>
              <div className="security-layer">
                <strong>Application Layer</strong>
                <p>Input validation, XSS protection</p>
              </div>
              <div className="security-layer">
                <strong>Data Layer</strong>
                <p>Encryption, Access control</p>
              </div>
              <div className="security-layer">
                <strong>Infrastructure</strong>
                <p>Monitoring, Incident response</p>
              </div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master web security fundamentals including authentication, authorization, data protection, common vulnerabilities, and modern security practices. Build secure applications that protect user data!",
      videoId: "YYe0FdfdgDU",
    },
    11: {
      title: "Node.js & Express Fundamentals",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🍎 The Apple Innovation (2008)</h3>
            <p>
              Ryan Dahl at Google was frustrated with the limitations of web
              servers. He thought, "What if we could run JavaScript on the
              server?" Using Chrome's V8 JavaScript engine, he created Node.js -
              a runtime that changed everything!
            </p>
            <div className="innovation-moment">
              <strong>💡 The Lightbulb:</strong> "JavaScript everywhere!"
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>⚡ The Event Loop Revelation</h3>
            <p>
              Traditional servers use threading - each request gets its own
              thread. Node.js used an event loop - one thread handles
              everything! Perfect for I/O-intensive operations like APIs and
              real-time apps.
            </p>
            <div className="comparison-demo">
              <div className="threading-model">
                <strong>Traditional: Multi-threaded</strong>
                <div className="thread-pool">
                  <div className="thread">Thread 1</div>
                  <div className="thread">Thread 2</div>
                  <div className="thread">Thread 3</div>
                </div>
              </div>
              <div className="event-loop-model">
                <strong>Node.js: Event Loop</strong>
                <div className="single-thread">One Thread Handles All!</div>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>📦 NPM: The Package Ecosystem (2010)</h3>
            <p>
              Node Package Manager (NPM) became the largest software registry in
              the world! Suddenly, developers could share and reuse code
              effortlessly. Express.js became the most popular web framework!
            </p>
            <div className="npm-growth">
              <div className="growth-stat">
                <strong>2010:</strong> 1,000 packages
              </div>
              <div className="growth-stat">
                <strong>2023:</strong> 2+ million packages!
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 The Modern Backend (2015-Present)</h3>
            <p>
              Node.js evolved with async/await, TypeScript, modern frameworks,
              and cloud deployment. From simple APIs to microservices, Node.js
              powers the backend of companies like Netflix, Uber, and LinkedIn!
            </p>
            <div className="modern-stack">
              <div className="tech-item">Express.js</div>
              <div className="tech-item">TypeScript</div>
              <div className="tech-item">Docker</div>
              <div className="tech-item">AWS Lambda</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Learn Node.js fundamentals including the event loop, npm ecosystem, Express.js framework, and modern backend development patterns. Build scalable server-side applications!",
      videoId: "fBNz5xF-Kx4",
    },
    12: {
      title: "Database Integration & ORM",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>📊 The Database Revolution (1970s-1990s)</h3>
            <p>
              Before databases, applications stored data in files. Edgar Codd's
              relational model changed everything - structured tables with
              relationships! SQL became the universal language for data.
            </p>
            <div className="evolution-timeline">
              <div className="era">
                <strong>Files</strong>
                <p>🔳 Plain text files</p>
              </div>
              <div className="arrow">➡️</div>
              <div className="era">
                <strong>Relational DB</strong>
                <p>📋 Structured tables</p>
              </div>
              <div className="arrow">➡️</div>
              <div className="era">
                <strong>NoSQL</strong>
                <p>📄 Flexible schemas</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🔗 The Object-Relational Mismatch (1990s-2000s)</h3>
            <p>
              Object-oriented programming didn't match relational databases.
              Developers wrote tons of SQL queries and manual mapping code.
              Something had to bridge this gap!
            </p>
            <div className="mapping-nightmare">
              <div className="object-side">
                <strong>Objects</strong>
                <code>user.posts[0].title</code>
              </div>
              <div className="mapping-arrow">🔄</div>
              <div className="database-side">
                <strong>Database</strong>
                <code>SELECT title FROM posts WHERE user_id = ?</code>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🛠️ The ORM Solution (2000s-2010s)</h3>
            <p>
              Object-Relational Mapping (ORM) frameworks like Hibernate (Java),
              SQLAlchemy (Python), and Sequelize (JavaScript) automated the
              mapping between objects and database tables!
            </p>
            <div className="orm-benefits">
              <div className="benefit">
                <strong>Less SQL</strong>
                <p>Write JavaScript instead of SQL</p>
              </div>
              <div className="benefit">
                <strong>Type Safety</strong>
                <p>Catch errors at compile time</p>
              </div>
              <div className="benefit">
                <strong>Portability</strong>
                <p>Switch databases easily</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>☁️ Modern Database Patterns (2015-Present)</h3>
            <p>
              Today's applications use multiple databases - PostgreSQL for
              transactions, MongoDB for documents, Redis for caching, and more.
              ORMs evolved to handle this complexity!
            </p>
            <div className="polyglot-persistence">
              <div className="db-type">PostgreSQL</div>
              <div className="db-type">MongoDB</div>
              <div className="db-type">Redis</div>
              <div className="db-type">Elasticsearch</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master database integration with Node.js including SQL vs NoSQL databases, ORM frameworks, connection pooling, and modern data persistence patterns. Build robust data layers!",
      videoId: "7S_tz1z_5bA",
    },
    13: {
      title: "API Design & Architecture",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🔌 The API Economy (1990s-2000s)</h3>
            <p>
              In the early web, services were siloed. Salesforce pioneered the
              idea of exposing business logic through APIs. Suddenly, developers
              could integrate external services into their applications!
            </p>
            <div className="api-pioneers">
              <div className="pioneer">
                <strong>Salesforce API</strong>
                <p>First major business API</p>
              </div>
              <div className="pioneer">
                <strong>eBay API</strong>
                <p>Marketplace integration</p>
              </div>
              <div className="pioneer">
                <strong>Amazon API</strong>
                <p>Product data access</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🎯 REST: The Architectural Style (2000)</h3>
            <p>
              Roy Fielding's dissertation introduced REST - Representational
              State Transfer. It wasn't a protocol, but a set of constraints for
              building scalable web services. GET, POST, PUT, DELETE became
              universal!
            </p>
            <div className="rest-principles">
              <div className="principle">Stateless</div>
              <div className="principle">Cacheable</div>
              <div className="principle">Uniform Interface</div>
              <div className="principle">Layered System</div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>📱 Mobile & Web 2.0 Explosion (2007-2012)</h3>
            <p>
              The iPhone launch and social media boom created demand for APIs.
              Twitter API, Facebook Graph API, and Google Maps API became the
              foundation for thousands of apps. API-first design was born!
            </p>
            <div className="api-explosion">
              <div className="api-category">
                <strong>Social</strong>
                <p>Twitter, Facebook, LinkedIn</p>
              </div>
              <div className="api-category">
                <strong>Payment</strong>
                <p>Stripe, PayPal</p>
              </div>
              <div className="api-category">
                <strong>Maps</strong>
                <p>Google, Mapbox</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 Modern API Patterns (2015-Present)</h3>
            <p>
              Today's APIs are sophisticated: GraphQL for flexible queries, gRPC
              for high performance, WebSocket for real-time, and API gateways
              for microservices. The API is the product!
            </p>
            <div className="modern-api-stack">
              <div className="api-tech">GraphQL</div>
              <div className="api-tech">gRPC</div>
              <div className="api-tech">WebSocket</div>
              <div className="api-tech">API Gateway</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Design and build RESTful APIs with proper HTTP methods, status codes, error handling, authentication, and documentation. Learn modern API patterns including GraphQL and WebSocket!",
      videoId: "XvFmUE-36Kc",
    },
    14: {
      title: "User Experience Fundamentals",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🖥️ The Interface Revolution (1970s-1980s)</h3>
            <p>
              Before GUIs, computers were text-only! Xerox PARC invented the
              graphical user interface with windows, icons, and mouse. Apple's
              Macintosh in 1984 brought this to consumers. User interfaces were
              born!
            </p>
            <div className="ui-evolution">
              <div className="era">
                <strong>Command Line</strong>
                <p>⌨️ Text commands only</p>
              </div>
              <div className="arrow">➡️</div>
              <div className="era">
                <strong>GUI</strong>
                <p>🖱️ Visual interface</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🧠 The Cognitive Science Connection (1990s)</h3>
            <p>
              Donald Norman's "Design of Everyday Things" revolutionized how we
              think about user experience. He coined "user-centered design" and
              introduced concepts like affordances and signifiers!
            </p>
            <div className="ux-principles">
              <div className="principle">
                <strong>Affordances</strong>
                <p>What can be done with an object</p>
              </div>
              <div className="principle">
                <strong>Signifiers</strong>
                <p>Indicators of what to do</p>
              </div>
              <div className="principle">
                <strong>Feedback</strong>
                <p>Response to user actions</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>📱 The Mobile UX Shift (2007-2010)</h3>
            <p>
              The iPhone changed everything! Touch interfaces required new
              design patterns: swipe gestures, pinch-to-zoom, and thumb-friendly
              design. UX became mobile-first!
            </p>
            <div className="mobile-patterns">
              <div className="pattern">Swipe Navigation</div>
              <div className="pattern">Pull-to-Refresh</div>
              <div className="pattern">Bottom Navigation</div>
              <div className="pattern">Card-based UI</div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🌟 Modern UX Design (2010-Present)</h3>
            <p>
              Today's UX encompasses the entire user journey: research, design,
              testing, and optimization. Tools like Figma, user testing
              platforms, and analytics have made UX more scientific and
              data-driven!
            </p>
            <div className="modern-ux-toolkit">
              <div className="tool">Figma</div>
              <div className="tool">User Testing</div>
              <div className="tool">Analytics</div>
              <div className="tool">A/B Testing</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Learn user experience fundamentals including user research, information architecture, interaction design, usability principles, and the complete UX design process. Create intuitive, user-centered designs!",
      videoId: "6qLq7xkodA8",
    },
    15: {
      title: "Visual Design & Branding",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>🎨 The Bauhaus Revolution (1919-1933)</h3>
            <p>
              The German Bauhaus school changed design forever! They combined
              art, craft, and technology. "Form follows function" became the
              mantra. Modern design was born from this revolutionary approach!
            </p>
            <div className="bauhaus-principles">
              <div className="principle">Function First</div>
              <div className="principle">Minimalism</div>
              <div className="principle">Typography Focus</div>
              <div className="principle">Geometric Shapes</div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🖥️ Digital Design Emergence (1980s-1990s)</h3>
            <p>
              Desktop publishing with Adobe PageMaker and later Photoshop
              democratized design. Suddenly, anyone could create professional-
              looking materials. The design industry was transformed!
            </p>
            <div className="digital-tools">
              <div className="tool">
                <strong>Photoshop</strong>
                <p>Image editing (1990)</p>
              </div>
              <div className="tool">
                <strong>Illustrator</strong>
                <p>Vector graphics (1987)</p>
              </div>
              <div className="tool">
                <strong>InDesign</strong>
                <p>Layout design (1999)</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>📱 The Brand Identity Explosion (2000s-2010s)</h3>
            <p>
              As brands went digital, visual identity became crucial. Apple,
              Google, and Airbnb created iconic, memorable brands. Color
              psychology, typography systems, and visual consistency rules
              emerged!
            </p>
            <div className="brand-evolution">
              <div className="brand-aspect">
                <strong>Color</strong>
                <p>Psychology & Emotion</p>
              </div>
              <div className="brand-aspect">
                <strong>Typography</strong>
                <p>Voice & Personality</p>
              </div>
              <div className="brand-aspect">
                <strong>Icons</strong>
                <p>Recognition & Memory</p>
              </div>
              <div className="brand-aspect">
                <strong>Layout</strong>
                <p>Hierarchy & Flow</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🚀 Modern Design Systems (2015-Present)</h3>
            <p>
              Today's brands need consistency across platforms. Design systems
              with components, guidelines, and tokens ensure cohesive brand
              experiences everywhere - from mobile apps to websites!
            </p>
            <div className="design-systems">
              <div className="system">Material Design</div>
              <div className="system">Apple HIG</div>
              <div className="system">Carbon Design</div>
              <div className="system">Lightning Design</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Master visual design principles including color theory, typography, layout, branding, and design systems. Create compelling visual experiences that communicate effectively and build brand recognition!",
      videoId: "QuQVpNuRmd4",
    },
    16: {
      title: "Prototyping & User Testing",
      history: () => (
        <div className="lesson-history">
          <div className="timeline-item animate-on-scroll">
            <h3>📋 The Paper Prototype Era (1960s-1990s)</h3>
            <p>
              Early designers used paper sketches and cardboard cutouts to test
              interfaces. It was cheap, fast, and anyone could do it! The
              foundation of rapid prototyping was laid with simple materials.
            </p>
            <div className="prototype-evolution">
              <div className="method">
                <strong>Paper Sketches</strong>
                <p>✏️ Hand-drawn interfaces</p>
              </div>
              <div className="method">
                <strong>Storyboards</strong>
                <p>🎬 Step-by-step flows</p>
              </div>
              <div className="method">
                <strong>Card Sorting</strong>
                <p>🃏 Information architecture</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>💻 Digital Prototyping Tools (2000s-2010s)</h3>
            <p>
              Software like Axure RP, Balsamiq, and later Sketch and Figma
              revolutionized prototyping. Designers could create interactive
              prototypes that felt real without coding!
            </p>
            <div className="tool-timeline">
              <div className="era">
                <strong>2000s:</strong> Axure, Balsamiq
              </div>
              <div className="era">
                <strong>2010s:</strong> Sketch, InVision
              </div>
              <div className="era">
                <strong>2020s:</strong> Figma, ProtoPie
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🧪 The Testing Revolution (2005-2015)</h3>
            <p>
              Companies like Google and Apple popularized user testing. "Move
              fast and break things" evolved to "test fast and learn faster."
              Remote testing tools made it possible to test with users
              worldwide!
            </p>
            <div className="testing-methods">
              <div className="method">
                <strong>Usability Testing</strong>
                <p>👥 Watch users interact</p>
              </div>
              <div className="method">
                <strong>A/B Testing</strong>
                <p>🔄 Compare versions</p>
              </div>
              <div className="method">
                <strong>Heatmaps</strong>
                <p>🔥 See user behavior</p>
              </div>
              <div className="method">
                <strong>Analytics</strong>
                <p>📊 Measure engagement</p>
              </div>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll">
            <h3>🤖 AI-Powered Design (2020-Present)</h3>
            <p>
              Today's prototypes can be voice-controlled, AR/VR experiences, or
              even generated by AI! Tools like Framer, Protopie, and AI
              assistants are making prototyping faster and more accessible.
            </p>
            <div className="future-prototyping">
              <div className="tech">Voice Prototypes</div>
              <div className="tech">AR/VR Testing</div>
              <div className="tech">AI Generation</div>
              <div className="tech">Code-to-Prototype</div>
            </div>
          </div>
        </div>
      ),
      overview:
        "Learn prototyping methodologies and user testing techniques including wireframing, interactive prototyping, usability testing, A/B testing, and how to gather and act on user feedback effectively!",
      videoId: "PZ2hchA4Jvg",
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
    5: [
      // Advanced CSS & Modern Layout
      {
        question: "What does CSS Grid provide that Flexbox doesn't?",
        options: [
          "Two-dimensional layouts",
          "Animations",
          "Typography control",
          "Color management",
        ],
        correct: 0,
      },
      {
        question: "Which property is used to create gaps between grid items?",
        options: ["grid-gap", "gap", "grid-spacing", "item-gap"],
        correct: 1,
      },
      {
        question: "What is the purpose of CSS custom properties (variables)?",
        options: [
          "To store JavaScript values",
          "To create reusable values in CSS",
          "To define HTML attributes",
          "To manage JavaScript state",
        ],
        correct: 1,
      },
      {
        question:
          "Which CSS feature allows for responsive design without media queries?",
        options: ["Flexbox", "CSS Grid", "Container queries", "CSS variables"],
        correct: 2,
      },
      {
        question:
          "What is the difference between absolute and relative units in CSS?",
        options: [
          "Relative units are fixed, absolute units scale",
          "Absolute units are fixed, relative units scale",
          "There is no difference",
          "Relative units only work with typography",
        ],
        correct: 1,
      },
    ],
    6: [
      // ES6+ & Modern JavaScript
      {
        question: "What is the difference between `let` and `var`?",
        options: [
          "No difference",
          "`let` is block-scoped, `var` is function-scoped",
          "`var` is block-scoped, `let` is function-scoped",
          "`let` is for constants, `var` is for variables",
        ],
        correct: 1,
      },
      {
        question: "What does the optional chaining operator (?.) do?",
        options: [
          "Makes code optional",
          "Safely accesses nested object properties",
          "Creates optional parameters",
          "Makes variables optional",
        ],
        correct: 1,
      },
      {
        question: "How do you create a Promise in JavaScript?",
        options: [
          "new Promise()",
          "createPromise()",
          "Promise.create()",
          "makePromise()",
        ],
        correct: 0,
      },
      {
        question: "What is the purpose of async/await?",
        options: [
          "To make code slower",
          "To write asynchronous code that looks synchronous",
          "To replace Promises",
          "To handle errors only",
        ],
        correct: 1,
      },
      {
        question: "Which method is used to destructure an array?",
        options: [
          "Object destructuring",
          "Array destructuring",
          "Spread operator",
          "Rest parameter",
        ],
        correct: 1,
      },
    ],
    7: [
      // Advanced React & Performance
      {
        question: "What is the purpose of React.memo()?",
        options: [
          "To make components faster",
          "To prevent unnecessary re-renders",
          "To manage component state",
          "To handle events",
        ],
        correct: 1,
      },
      {
        question: "When should you use useMemo()?",
        options: [
          "For expensive calculations",
          "For handling side effects",
          "For managing component state",
          "For event handling",
        ],
        correct: 0,
      },
      {
        question:
          "What is the difference between useEffect and useLayoutEffect?",
        options: [
          "No difference",
          "useLayoutEffect runs synchronously after DOM mutations",
          "useEffect is faster",
          "useLayoutEffect is deprecated",
        ],
        correct: 1,
      },
      {
        question: "What is code splitting in React?",
        options: [
          "Splitting CSS from JavaScript",
          "Loading components only when needed",
          "Splitting large functions",
          "Separating business logic from UI",
        ],
        correct: 1,
      },
      {
        question: "What does the useCallback hook do?",
        options: [
          "Caches function instances",
          "Manages component lifecycle",
          "Handles side effects",
          "Manages component state",
        ],
        correct: 0,
      },
    ],
    8: [
      // Backend Development & APIs
      {
        question: "What does REST stand for in RESTful APIs?",
        options: [
          "Representational State Transfer",
          "Remote Event System Technology",
          "Reliable Element Service Transfer",
          "Resource Exchange System Type",
        ],
        correct: 0,
      },
      {
        question: "Which HTTP method is typically used for retrieving data?",
        options: ["POST", "GET", "PUT", "DELETE"],
        correct: 1,
      },
      {
        question: "What is the main purpose of middleware in Express.js?",
        options: [
          "To handle database connections",
          "To process requests before they reach route handlers",
          "To serve static files",
          "To manage user authentication",
        ],
        correct: 1,
      },
      {
        question: "What is CORS and why is it important?",
        options: [
          "A database technology",
          "Cross-Origin Resource Sharing for browser security",
          "A JavaScript framework",
          "A CSS property",
        ],
        correct: 1,
      },
      {
        question:
          "Which of these is NOT a typical backend programming language?",
        options: ["Node.js", "Python", "JavaScript (browser)", "Java"],
        correct: 2,
      },
    ],
    9: [
      // Database Design & Management
      {
        question: "What is normalization in database design?",
        options: [
          "Making databases smaller",
          "Organizing data to reduce redundancy",
          "Speeding up queries",
          "Creating backup copies",
        ],
        correct: 1,
      },
      {
        question: "Which database type is best for storing hierarchical data?",
        options: [
          "Relational databases",
          "Document databases",
          "Graph databases",
          "Key-value stores",
        ],
        correct: 2,
      },
      {
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integration, Data",
          "Analysis, Communication, Implementation, Deployment",
          "Association, Connection, Independence, Distribution",
        ],
        correct: 0,
      },
      {
        question: "What is the difference between SQL and NoSQL databases?",
        options: [
          "SQL are faster, NoSQL are slower",
          "SQL use structured tables, NoSQL use flexible schemas",
          "NoSQL are newer than SQL",
          "SQL don't support relationships",
        ],
        correct: 1,
      },
      {
        question: "What is indexing in databases?",
        options: [
          "Deleting old data",
          "Creating data structures to speed up queries",
          "Making backups",
          "Encrypting data",
        ],
        correct: 1,
      },
    ],
    10: [
      // Web Security & Best Practices
      {
        question: "What is SQL injection?",
        options: [
          "Injecting malicious SQL code through user input",
          "A type of database backup",
          "A way to optimize database queries",
          "A database programming language",
        ],
        correct: 0,
      },
      {
        question: "What does HTTPS provide that HTTP doesn't?",
        options: [
          "Faster loading",
          "Encryption and security",
          "Better formatting",
          "More features",
        ],
        correct: 1,
      },
      {
        question: "What is XSS (Cross-Site Scripting)?",
        options: [
          "A database attack",
          "Injecting malicious scripts into web pages",
          "A network protocol",
          "A type of encryption",
        ],
        correct: 1,
      },
      {
        question: "What is the principle of least privilege?",
        options: [
          "Giving users maximum access",
          "Giving users only the access they need",
          "Never giving users any access",
          "Giving all users the same access",
        ],
        correct: 1,
      },
      {
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two passwords",
          "Using two different authentication methods",
          "Logging in twice",
          "Using two different browsers",
        ],
        correct: 1,
      },
    ],
    11: [
      // Node.js & Express Fundamentals
      {
        question: "What is Node.js?",
        options: [
          "A JavaScript library for frontend development",
          "A JavaScript runtime built on Chrome's V8 engine",
          "A database management system",
          "A CSS framework",
        ],
        correct: 1,
      },
      {
        question: "What is the main advantage of Node.js event loop?",
        options: [
          "It makes JavaScript run faster than other languages",
          "It handles I/O operations efficiently with non-blocking calls",
          "It automatically optimizes code",
          "It manages memory automatically",
        ],
        correct: 1,
      },
      {
        question: "What is Express.js?",
        options: [
          "A database",
          "A minimal and flexible Node.js web application framework",
          "A JavaScript testing library",
          "A CSS preprocessor",
        ],
        correct: 1,
      },
      {
        question: "What does NPM stand for?",
        options: [
          "Node Package Manager",
          "New Project Manager",
          "Node Program Manager",
          "Network Package Manager",
        ],
        correct: 0,
      },
      {
        question: "Which command initializes a new Node.js project?",
        options: ["node init", "npm start", "npm init", "node new"],
        correct: 2,
      },
    ],
    12: [
      // Database Integration & ORM
      {
        question: "What is an ORM?",
        options: [
          "Object-Relational Mapping",
          "Online Resource Manager",
          "Object-Runtime Module",
          "Open Relational Model",
        ],
        correct: 0,
      },
      {
        question: "What are the benefits of using an ORM?",
        options: [
          "Faster database queries",
          "Automatic code generation and type safety",
          "Better security",
          "All of the above",
        ],
        correct: 3,
      },
      {
        question: "Which of these is a popular ORM for Node.js?",
        options: ["Sequelize", "Hibernate", "Entity Framework", "Django ORM"],
        correct: 0,
      },
      {
        question: "What is connection pooling?",
        options: [
          "Creating multiple database connections for each query",
          "Reusing database connections to improve performance",
          "Storing database queries in memory",
          "Encrypting database connections",
        ],
        correct: 1,
      },
      {
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Automatic, Consistent, Independent, Durable",
          "Applied, Configured, Integrated, Deployed",
          "Association, Control, Implementation, Development",
        ],
        correct: 0,
      },
    ],
    13: [
      // API Design & Architecture
      {
        question: "What is the main principle of RESTful API design?",
        options: [
          "Use complex authentication methods",
          "Stateless communication between client and server",
          "Always return JSON format",
          "Use POST requests for everything",
        ],
        correct: 1,
      },
      {
        question: "Which HTTP status code indicates a successful request?",
        options: ["200", "404", "500", "301"],
        correct: 0,
      },
      {
        question: "What is GraphQL?",
        options: [
          "A database",
          "A query language for APIs that allows clients to request specific data",
          "A JavaScript framework",
          "A CSS methodology",
        ],
        correct: 1,
      },
      {
        question: "What is API versioning?",
        options: [
          "Updating APIs frequently",
          "Managing different versions of APIs to maintain backward compatibility",
          "Making APIs faster",
          "Securing APIs with passwords",
        ],
        correct: 1,
      },
      {
        question: "What is the purpose of API documentation?",
        options: [
          "To make APIs look professional",
          "To help developers understand how to use the API",
          "To secure the API",
          "To speed up API responses",
        ],
        correct: 1,
      },
    ],
    14: [
      // User Experience Fundamentals
      {
        question: "What does UX stand for?",
        options: [
          "User Experience",
          "Universal Design",
          "User Interface",
          "User Integration",
        ],
        correct: 0,
      },
      {
        question: "What is user-centered design?",
        options: [
          "Designing for the developer's convenience",
          "Designing based on user needs, behaviors, and goals",
          "Making designs look modern",
          "Creating complex interfaces",
        ],
        correct: 1,
      },
      {
        question: "What are affordances in UX design?",
        options: [
          "The visual appearance of objects",
          "Properties that show users what actions they can perform",
          "The color scheme of an interface",
          "The text content of a page",
        ],
        correct: 1,
      },
      {
        question: "What is information architecture?",
        options: [
          "The visual design of a website",
          "The way content is organized and labeled",
          "The database structure",
          "The server configuration",
        ],
        correct: 1,
      },
      {
        question: "What is the primary goal of user testing?",
        options: [
          "To validate design decisions with real users",
          "To show off the product to stakeholders",
          "To test the technical implementation",
          "To measure performance metrics",
        ],
        correct: 0,
      },
    ],
    15: [
      // Visual Design & Branding
      {
        question: "What is the main principle of color theory?",
        options: [
          "Use as many colors as possible",
          "Understand how colors interact and affect emotions",
          "Always use bright colors",
          "Never use more than three colors",
        ],
        correct: 1,
      },
      {
        question: "What is typography?",
        options: [
          "The art of designing with text",
          "A type of database",
          "A programming language",
          "A design tool",
        ],
        correct: 0,
      },
      {
        question: "What is a design system?",
        options: [
          "A collection of design rules and components",
          "A software program",
          "A design conference",
          "A type of computer",
        ],
        correct: 0,
      },
      {
        question: "What is brand consistency?",
        options: [
          "Using the same colors everywhere",
          "Maintaining uniform visual identity across all touchpoints",
          "Having the same logo size",
          "Using only one font",
        ],
        correct: 1,
      },
      {
        question: "What is the purpose of white space in design?",
        options: [
          "To waste space",
          "To improve readability and visual hierarchy",
          "To make the design look empty",
          "To save printing costs",
        ],
        correct: 1,
      },
    ],
    16: [
      // Prototyping & User Testing
      {
        question: "What is the purpose of prototyping?",
        options: [
          "To create the final product",
          "To test ideas and gather feedback before development",
          "To impress clients",
          "To save development time only",
        ],
        correct: 1,
      },
      {
        question: "What is A/B testing?",
        options: [
          "Testing two versions of a design to see which performs better",
          "Testing accessibility only",
          "Testing with two different browsers",
          "Testing database performance",
        ],
        correct: 0,
      },
      {
        question: "What are wireframes?",
        options: [
          "Detailed visual designs",
          "Low-fidelity layouts showing structure and content",
          "Database schemas",
          "Code documentation",
        ],
        correct: 1,
      },
      {
        question: "What is usability testing?",
        options: [
          "Testing if the code works",
          "Observing users as they interact with a product to identify issues",
          "Testing server performance",
          "Testing security features",
        ],
        correct: 1,
      },
      {
        question: "What is a user journey map?",
        options: [
          "A map of physical locations",
          "A visualization of the user's experience through the product",
          "A database of user data",
          "A network diagram",
        ],
        correct: 1,
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

  useEffect(() => {
    // Add scroll animation when lessons are displayed
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

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showQuiz]);

  if (!showQuiz) {
    const lesson = lessonData[courseId];
    if (!lesson) {
      return <div className="container">Loading lesson...</div>;
    }
    return (
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #207985, #1d4ed8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeInUp 0.8s ease-out",
          }}
        >
          {lesson.title}
        </h1>

        {lesson.image && (
          <div
            className="lesson-hero-image"
            style={{
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <img
              src={lesson.image}
              alt={`${lesson.title} illustration`}
              style={{
                maxWidth: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            />
          </div>
        )}

        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            📚 The Amazing History
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🎯 What You'll Learn
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
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🎥 Video Tutorial
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
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1.1rem",
            background: "linear-gradient(135deg, #207985, #1d4ed8)",
            animation: "pulse 2s infinite",
          }}
        >
          🚀 Take the Quiz!
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
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button onClick={resetQuiz} className="btn">
              Retake Quiz
            </button>
            {localStorage.getItem("subscription") !== "premium" && (
              <button
                className="btn"
                style={{
                  background: "#ffd700",
                  color: "#000",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/pricing")}
              >
                Subscribe to Premium
              </button>
            )}
          </div>
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
