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
var displayTime = document.getElementById("Display-Time");
var bestScore = document.getElementById("high-score");

var index = 0;
var score = 0;
var timeLeft = 30;
var userInitials = [];
var scoreArray = [];


function startGame() {
  showQuestions();
  keepTime();
}

function showQuestions() {
  questionBox.innerHTML = "";
  var question = document.createElement("h1");
  question.innerHTML = questions[index].question;

  var buttons = document.createElement("div");
  buttons.innerHTML = `
  <button id="A" onclick="correctAnswer(0)" class="button">${questions[index].choices[0]}</button>
  <button id="B" onclick="correctAnswer(1)" class="button">${questions[index].choices[1]}</button>
  <button id="C" onclick="correctAnswer(2)" class="button">${questions[index].choices[2]}</button>
  <button id="D" onclick="correctAnswer(3)" class="button">${questions[index].choices[3]}</button>
  `;

  questionBox.append(question, buttons);
}

function correctAnswer(answer) {
  console.log(answer);
  var message = document.getElementById("message");
  if (answer === questions[index].answer) {
    score++;
    scorEL.innerHTML = score;
    message.innerHTML = "your answer was correct!";
  } else {
    message.innerHTML = "your answer was incorrect";
    timeLeft = timeLeft - 5;
  }

  index++;
  if (index < questions.length) {
    startGame();
  } else {
    endGame();
  }
}

function keepTime() {
  var timer = setInterval(function () {
    timeLeft--;
    displayTime.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  displayTime.innerHTML = 0;
  questionBox.innerHTML = "";
  // var saveButton = document.getElementById("save");
  // saveButton.addEventListener('click' , saveScore);
}

function getInitials() {
  var name = document.getElementById("initials").value;

  if (localStorage.getItem("userInitials")) {
    var names = JSON.parse(localStorage.getItem("userInitials"));
    names.push(name);
    localStorage.setItem("userInitials", JSON.stringify(names));
  } else {
    userInitials.push(name);
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
  }
  if (localStorage.getItem("highScores")) {
    var scores = JSON.parse(localStorage.getItem("highScores"));
    scores.push(score);
    localStorage.setItem("highScores", JSON.stringify(scores));
  } else {
    scoreArray.push(score);
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
  }
  showHighScores();
}

function showHighScores() {
  var userName = JSON.parse(localStorage.getItem("userInitials"));
  var userScore = JSON.parse(localStorage.getItem("highScores"));
  questionBox.innerHTML = "";
  bestScore.innerHTML = "";

  var displayScores = document.createElement("ul");
  for (let index = 0; index < userName.length; index++) {
  console.log(userName[index])
  var listItem = document.createElement("li");
  listItem.innerHTML = `${userName[index]} ${userScore[index]}`
  displayScores.append(listItem); 
  }
  
  questionBox.append(displayScores);

}


// function saveScore(e) {
// e.preventDefault();
// // console.log(name);
// }
