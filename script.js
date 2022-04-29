const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const displayContainer = document.getElementById("display-container");
const pointsContainer = document.getElementById("points-container");
const lifelineContainer = document.getElementById("lifeline-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const counterDisplayElem = document.querySelector(".counter-display");
const pointsDisplayElem = document.querySelector(".points-display");
const lifelineDisplayElem = document.querySelectorAll(".lifeline-btn");
const lifelineEle50_50 = document.querySelector(" .btn50-50");
const lifelineEleStopTimer = document.querySelector(".btnStopTimer");
const lifelineEleSwapQuestion = document.querySelector(".btnSwapQuestion");
let currentQuestion;
let points;
let count = 10;
var myInterval;
let randomQuestion, currentQuestionIndex;
let userData = { username: "", score: 0 };
let highScore = [];
function initialSetUp() {
  getVal()
   document.querySelector(".userData-container").style.display="none";
   document.querySelector(".container").classList.remove("hide");

}
function getVal() {
  userData.username = document.querySelector("input").value;
  
}
document.body.addEventListener("click", treatBodyClick)
function treatBodyClick(event) {
  console.log(event);
  const idOfClick = event.target.id;
  switch (idOfClick) {
    case "start-btn":
      return startGame();
    case "next-btn":
      return nextQuestion();
    case "lifeline-btn50-50":
      return lifelineFunction50_50();

    case "lifeline-btnStopTimer":
      return lifelineFunctionStopTimer();
    case "lifeline-btnSwapQ":
      return lifelineFunctionSwapQ();
  }
}
document.body.addEventListener("mouseover", treatBodyHover);
function treatBodyHover(event) {
  const idOfHover = event.target.id;
  switch (idOfHover) {
    case "lifeline-btn50-50":
      return tooltip50_50Function();
    case "lifeline-btnStopTimer":
      return tooltipStopTimerFunction();
    case "lifeline-btnSwapQ":
      return tooltipSwapQFunction();
  }
}

const nextQuestion= () => {
  counterDisplayElem.innerHTML = "Count down begins...";
  currentQuestionIndex++;
  setNextQuestion();
  clearStatusClass(document.body);
  resetCountDown();
  countDown();
};
function startGame() {
  counterDisplayElem.innerHTML = "Count down begins...";
  startButton.classList.add("hide");
  nextButton.classList.remove("hide");
  displayContainer.classList.remove("hide");
  questionContainer.classList.remove("hide");
  lifelineContainer.classList.remove("hide");
  pointsContainer.classList.add("hide");
  randomQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  points = 0;
  setNextQuestion();
  resetCountDown();
  countDown();
  resetLifelines();
}

function countDown() {
  myInterval = setInterval(function () {
    counterDisplayElem.innerHTML = count;
    if (count === 0) {
      counterDisplayElem.innerHTML = "Time Up!!";
      questionContainer.classList.add("hide");
      startButton.innerText = "restart";
      startButton.classList.remove("hide");
      lifelineContainer.classList.add("hide");
    } else {
      count--;
    }
  }, 1000);
}
function resetCountDown() {
  clearInterval(myInterval);
  count = 60;
  counterDisplayElem.innerHTML = "Count down begins";
  questionContainer.classList.remove("hide");
  startButton.innerText = "start";
}
const questions = [
  {
    question: "What war did Captain America fight in?",
    answers: [
      { text: `World War 1`, correct: false },
      { text: `World War 2`, correct: true },
      { text: `Vietnam War`, correct: false },
      { text: `Gulf War`, correct: false },
    ],
  },
  {
    question: "Which avenger has a shield?",
    answers: [
      { text: `Spider-Man`, correct: false },
      { text: `Captian America`, correct: true },
      { text: `Thor`, correct: false },
      { text: `Hulk`, correct: false },
    ],
  },
  {
    question: "What is the name of Thor's Hammer?",
    answers: [
      { text: `Aesir`, correct: false },
      { text: `Fâner`, correct: false },
      { text: `Mjolnir`, correct: true },
      { text: `Rêquaer`, correct: false },
    ],
  },
  {
    question: "Which avenger has an arrow?",
    answers: [
      { text: `Spider-Man`, correct: false },
      { text: `Captian America`, correct: false },
      { text: `Thor`, correct: false },
      { text: `Hawkeye`, correct: true },
    ],
  },
  {
    question: "What is Captian Americas real name?",
    answers: [
      { text: `Steve Rogers`, correct: true },
      { text: `Peter parker`, correct: false },
      { text: `Loki`, correct: false },
      { text: `Tony Stark`, correct: false },
    ],
  },
];
function setNextQuestion() {
  resetState();
  showQuestion(randomQuestion[currentQuestionIndex]);
}
function showQuestion(questionEle) {
  questionElement.innerText = questionEle.question;
  answerButtonsElement.innerHTML = ``;
  questionEle.answers.forEach((ans) => {
    const button = document.createElement("button");
    button.innerText = ans.text;
    button.classList.add("btn");
    if (ans.correct) {
      button.dataset.correct = ans.correct; //sets data attribute to a string of ans.correct
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
//lifeline
//50-50
const lifelineFunction50_50 =() =>{
  points--;
  const buttons = Array.from(answerButtonsElement.children);
  let deletedButton = 0;
  for (i = 0; i < 3; i++) {
    if (!buttons[i].dataset.correct) {
      buttons[i].classList.add("hide");
      deletedButton++;
    }
    if (deletedButton == 2) {
      break;
    }
  }
  
  lifelineEle50_50.classList.add("hide");
 
};
//lifeline
//stopTimer
const lifelineFunctionStopTimer=function () {
  clearInterval(myInterval);
  points--;
  counterDisplayElem.innerHTML = "Timer stopped!";
  lifelineEleStopTimer.classList.add("hide");
};
//lifeline
//swapQuestion
const lifelineFunctionSwapQ= function () {
  lifelineEleSwapQuestion.classList.add("hide");
  points--;
  let swapQ = {
    question:
      "Who was the first female superhero to appear in the title of an MCU film?",
    answers: [
      { text: "Black Widow", correct: false },
      { text: "Gamora", correct: false },
      { text: "Wasp", correct: true },
      { text: "Wanda Maximoff", correct: false },
    ],
  };
  showQuestion(swapQ);
};
const tooltip50_50Function=function () {
 document.querySelector(".span50-50").classList.remove("hide")
}
const tooltipStopTimerFunction= function () {
  document.querySelector(".stopTimerSpan").classList.remove("hide");
};
const tooltipSwapQFunction=function () {
  document.querySelector(".swapqSpan").classList.remove("hide");
};
function resetLifelines() {
  lifelineEle50_50.classList.remove("hide");
  lifelineEleStopTimer.classList.remove("hide");
  lifelineEleSwapQuestion.classList.remove("hide");
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  resetCountDown();
  counterDisplayElem.innerText = "Press Next to continue.";
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    points += 2;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (randomQuestion.length > currentQuestionIndex + 1) {
    //finds if its not the last q
    nextButton.classList.remove("hide");
  } else {
    questionContainer.classList.add("hide");
    counterDisplayElem.innerText = "Press Restart to continue.";
    userData.score = points;
    // console.log('userdata',userData);
    
    // highScore.push(userData);
    // console.log(`hi`,highScore);
    
    let point;
    point = points == 1 ? `point` : "points";
    points > 0
      ? (pointsDisplayElem.innerText = `Congrats ${userData.username},you have won ${points} ${point}!`)
      : (pointsDisplayElem.innerText = `Try Again!`);
    pointsContainer.classList.remove("hide");
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
    lifelineContainer.classList.add("hide");
  }
}
function setStatusClass(domElement, correct) {
  clearStatusClass(domElement);
  if (correct) {
    domElement.classList.add("correct");
  } else {
    domElement.classList.add("wrong");
  }
}
function clearStatusClass(domElement) {
  domElement.classList.remove("correct");
  domElement.classList.remove("wrong");
}

//digital clock
function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();
