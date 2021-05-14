var questions = [
  {
    question: "what do dynamics tell you?",
    choices: [
      "how loud or soft to play",
      "not to play",
      "play faster",
      "play slower",
    ],
    answer: 0,
  },
  {
    question: "what is tempo?",
    choices: [
      "notes that you are playing",
      "which scale to play in",
      "rate of speed",
      "the song title",
    ],
    answer: 2,
  },
  {
    question: "what term is used to play loudly?",
    choices: ["Staccato", "Forte", "Piano", "Pizzacato"],
    answer: 1,
  },
  {
    question: "what symbol tells you to play a measure again?",
    choices: ["crescendo", "whole note", "a flat", "repeat sign"],
    answer: 3,
  },
  {
    question: "what connects two notes that are the same?",
    choices: ["a tie", "a bar", "a chord", "a beat"],
    answer: 0,
  },
];

const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startGame);
var questionBox = document.getElementById("questions");
var scorEL = document.getElementById("Assign-Score");

var index = 0;
var score = 0;
var timeLeft = 30;

function startGame() {
  showQuestions();
  keepTime();
}

function showQuestions() {
  questionBox.innerHTML = "";
  var question = document.createElement("h1");
  question.innerHTML = questions[index].question;

  var buttons = document.createElement("div");
  buttons.innerHTML = (`
  <button id="A" onclick="correctAnswer(0)" class="button">${questions[index].choices[0]}</button>
  <button id="B" onclick="correctAnswer(1)" class="button">${questions[index].choices[1]}</button>
  <button id="C" onclick="correctAnswer(2)" class="button">${questions[index].choices[2]}</button>
  <button id="D" onclick="correctAnswer(3)" class="button">${questions[index].choices[3]}</button>
  `);

  questionBox.append(question, buttons);
}

function correctAnswer(answer) {
  console.log(answer);
  var message = document.createElement("p");
  questionBox.append(message);
  if (answer === questions[index].answer) {
    score++;
    scorEL.innerHTML = score;
    message.innerHTML = "your answer was correct!";
  } else {
    message.innerHTML = "your answer was incorrect";
    timeLeft = timeLeft - 10;
  }

  index++;
  if (index < questions.length) {
    startGame();
  } else {
    endGame();
  }
  
}

function keepTime() {
  var displayTime = document.getElementById("Display-Time");  
  var timer = setInterval(function () {
    timeLeft--;
    displayTime.innerHTML = timeLeft
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  
}