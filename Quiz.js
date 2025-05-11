const questions = [
    {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"],
      correct: 0,
      explanation: "CSS stands for Cascading Style Sheets, which is a style sheet language used for describing the presentation of a document written in HTML."
    },
    {
      question: "Which JavaScript method is used to select an element by its ID?",
      answers: ["querySelector()", "getElementById()", "appendChild()", "innerHTML()"],
      correct: 1,
      explanation: "getElementById() is a method that returns an element with a specified ID. querySelector() can also select by ID using CSS selector syntax (#id), but getElementById() is specifically designed for this purpose."
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      answers: ["<heading>", "<h1>", "<head>", "<h6>"],
      correct: 1,
      explanation: "<h1> defines the most important and typically largest heading. HTML provides six levels of headings: <h1> (most important) to <h6> (least important)."
    },
    {
      question: "Which CSS property is used to change the text color of an element?",
      answers: ["font-color", "text-color", "color", "foreground-color"],
      correct: 2,
      explanation: "The 'color' property in CSS is used to set the color of text content. Other options like 'font-color' or 'text-color' are not valid CSS properties."
    },
    {
      question: "What is the correct JavaScript syntax to change the content of an HTML element with the ID 'demo'?",
      answers: [
        "document.getElement('demo').innerHTML = 'Hello';", 
        "document.getElementById('demo').innerHTML = 'Hello';", 
        "#demo.innerHTML = 'Hello';", 
        "document.getElementByName('demo').innerHTML = 'Hello';"
      ],
      correct: 1,
      explanation: "document.getElementById('demo').innerHTML = 'Hello'; is the correct syntax to select an element with the ID 'demo' and change its HTML content."
    },
    {
      question: "Which framework is developed by Facebook?",
      answers: ["Angular", "Vue", "React", "Svelte"],
      correct: 2,
      explanation: "React is a JavaScript library for building user interfaces that was developed and is maintained by Facebook (Meta). It's widely used for building single-page applications."
    },
    {
      question: "What is the purpose of the 'viewport' meta tag in HTML?",
      answers: [
        "To improve SEO ranking", 
        "To control layout on mobile browsers", 
        "To define the document's character set", 
        "To link to external JavaScript files"
      ],
      correct: 1,
      explanation: "The viewport meta tag gives the browser instructions on how to control the page's dimensions and scaling, which is crucial for responsive design on mobile devices."
    },
    {
      question: "Which of the following is a CSS preprocessor?",
      answers: ["jQuery", "SASS", "React", "Bootstrap"],
      correct: 1,
      explanation: "SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor that extends CSS with features like variables, nested rules, and mixins, making CSS more maintainable."
    },
    {
      question: "What does the 'async' attribute do in a script tag?",
      answers: [
        "Loads the script synchronously", 
        "Prevents the script from loading", 
        "Loads the script asynchronously without blocking page rendering", 
        "Executes the script multiple times"
      ],
      correct: 2,
      explanation: "The async attribute in a script tag allows the script to be downloaded asynchronously while the HTML parser continues parsing the page, improving page load performance."
    },
    {
      question: "Which CSS property is used to create space between elements?",
      answers: ["spacing", "gap", "margin", "padding"],
      correct: 2,
      explanation: "The margin property in CSS defines the space outside an element's border, creating space between elements. Padding creates space inside the element's border."
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15; // 15 seconds per question
  let quizStarted = false;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreEl = document.getElementById("score");
  const progressFill = document.getElementById("progress-fill");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("start-btn");
  const quizBox = document.getElementById("quiz-box");
  const introBox = document.getElementById("intro-box");
  const explanationEl = document.getElementById("explanation");
  const questionNumberEl = document.getElementById("question-number");
  
  startBtn.addEventListener("click", startQuiz);
  
  // Initialize the quiz
  function init() {
    quizBox.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    introBox.classList.remove("hidden");
    updateProgressBar();
  }
  
  function startQuiz() {
    quizStarted = true;
    introBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    quizBox.classList.add("fade-in");
    loadQuestion();
  }
  
  function loadQuestion() {
    if (currentQuestion >= questions.length) {
      endQuiz();
      return;
    }
  
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    explanationEl.textContent = "";
    explanationEl.classList.add("hidden");
    
    // Update question number
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Reset timer
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    clearInterval(timer);
    startTimer();
    
    // Display answers with animation
    q.answers.forEach((answer, idx) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => checkAnswer(idx);
      btn.classList.add("answer-btn");
      btn.style.animation = `fadeIn 0.5s ease forwards ${idx * 0.15}s`;
      btn.style.opacity = "0";
      li.appendChild(btn);
      answersEl.appendChild(li);
    });
    
    nextBtn.style.display = "none";
    updateProgressBar();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      
      if (timeLeft <= 5) {
        timerEl.classList.add("timer-warning");
      } else {
        timerEl.classList.remove("timer-warning");
      }
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(-1); // -1 means time's up (no selection)
      }
    }, 1000);
  }
  
  function checkAnswer(selected) {
    clearInterval(timer);
    const correct = questions[currentQuestion].correct;
    const explanation = questions[currentQuestion].explanation;
    
    // Display explanation
    explanationEl.textContent = explanation;
    explanationEl.classList.remove("hidden");
    
    if (selected === correct) {
      feedbackEl.textContent = "✅ Correct!";
      score++;
      feedbackEl.className = "feedback-correct"; // Apply CSS class for animation
    } else if (selected === -1) {
      feedbackEl.textContent = `⏱️ Time's up! Correct answer: ${questions[currentQuestion].answers[correct]}`;
      feedbackEl.className = "feedback-timeout";
    } else {
      feedbackEl.textContent = `❌ Wrong! Correct answer: ${questions[currentQuestion].answers[correct]}`;
      feedbackEl.className = "feedback-wrong";
    }
    
    // Disable all answer buttons and highlight correct one
    Array.from(answersEl.querySelectorAll("button")).forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correct) {
        btn.classList.add("correct-answer");
      } else if (idx === selected && selected !== correct) {
        btn.classList.add("wrong-answer");
      }
    });
    
    nextBtn.style.display = "block";
    nextBtn.classList.add("pulse");
  }
  
  nextBtn.onclick = () => {
    currentQuestion++;
    nextBtn.classList.remove("pulse");
    
    // Slide out current question
    quizBox.classList.add("slide-out");
    
    setTimeout(() => {
      quizBox.classList.remove("slide-out");
      quizBox.classList.add("slide-in");
      loadQuestion();
      
      setTimeout(() => {
        quizBox.classList.remove("slide-in");
      }, 500);
    }, 500);
  };
  
  function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
  
  function endQuiz() {
    quizBox.classList.add("fade-out");
    
    setTimeout(() => {
      quizBox.style.display = "none";
      scoreContainer.classList.remove("hidden");
      scoreContainer.classList.add("fade-in");
      
      // Calculate percentage
      const percentage = Math.round((score / questions.length) * 100);
      scoreEl.textContent = `${score} / ${questions.length} (${percentage}%)`;
      
      // Add feedback based on score
      const feedbackMessage = document.createElement("p");
      if (percentage >= 80) {
        feedbackMessage.textContent = "Excellent job! You're a frontend development expert!";
      } else if (percentage >= 60) {
        feedbackMessage.textContent = "Good work! You have solid frontend knowledge!";
      } else if (percentage >= 40) {
        feedbackMessage.textContent = "Not bad! Keep learning frontend concepts!";
      } else {
        feedbackMessage.textContent = "Keep practicing! Frontend development takes time to master.";
      }
      scoreContainer.appendChild(feedbackMessage);
      
      // Add recommendations based on score
      /*const recommendationsDiv = document.createElement("div");
      recommendationsDiv.className = "recommendations";
      recommendationsDiv.innerHTML = "<h3>Resources to improve your skills:</h3>";
      
      const resourceList = document.createElement("ul");
      resourceList.innerHTML = `
        <li>MDN Web Docs - comprehensive documentation for HTML, CSS, and JavaScript</li>
        <li>freeCodeCamp - free interactive coding lessons</li>
        <li>CSS-Tricks - tips, tricks, and techniques for frontend developers</li>
        <li>Frontend Masters - in-depth frontend courses</li>
      `;*/
      recommendationsDiv.appendChild(resourceList);
      scoreContainer.appendChild(recommendationsDiv);
      
      // Add confetti effect for good scores
      if (percentage >= 70) {
        createConfetti();
      }
    }, 500);
  }
  
  function createConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      
      // Random position, color and delay
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      
      document.body.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }
  
  // Initialize the quiz
  init();