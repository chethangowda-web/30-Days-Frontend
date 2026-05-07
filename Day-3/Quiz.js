const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks Text Management", correct: false },
      { text: "Hyper Tool Multi Language", correct: false }
    ]
  },

  {
    question: "Which language is used for styling?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "Java", correct: false }
    ]
  },

  {
    question: "Which language is used for website logic?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "CSS", correct: false },
      { text: "HTML", correct: false },
      { text: "C++", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;
    button.classList.add("btn");

    answerButtons.appendChild(button);

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if(isCorrect){
    selectedBtn.style.background = "green";
    score++;
  } else {
    selectedBtn.style.background = "red";
  }

  Array.from(answerButtons.children).forEach(button => {

    if(button.dataset.correct === "true"){
      button.style.background = "green";
    }

    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;

  scoreText.innerHTML = "Quiz Finished 🎉";

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {

  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }

});

startQuiz();