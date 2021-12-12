const start = document.getElementById("start")
const quiz = document.getElementById("quiz")
const quizImg = document.getElementById("quizImg")
const question = document.getElementById("question")
const counter = document.getElementById("counter")
const timeGauge = document.getElementById("timeGauge")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const progress = document.getElementById("progress")
const scoreContainer = document.getElementById("scoreContainer")

const renderQuestion = () => {
    count = 0
    renderCounter()
    let q = questions[runningQuestionIndex]
    quizImg.innerHTML = `<img width="200px" height="200px" src="${q.imgSrc}">`
    question.innerHTML = `<p>"${q.question}"</p>`
    choiceA.innerHTML = `<i class="bi bi-suit-club-fill"> </i> <span> ${q.A} </span>`
    choiceB.innerHTML = `<i class="bi bi-suit-diamond-fill"> </i> <span> ${q.B} </span>`
    choiceC.innerHTML = `<i class="bi bi-suit-heart-fill"> </i> <span> ${q.C} </span>`  
    choiceD.innerHTML = `<i class="bi bi-suit-spade-fill"> </i> <span> ${q.D} </span>`
}

const startQuiz = () => {
    start.style.display = "none"
    renderQuestion()
    quiz.style.display = "block"
    renderCounter()
    renderProgress()
    TIMER = setInterval(renderCounter, 1000)
}

const renderProgress = () => {
    for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += `<div class="prog" id="${qIndex}"></div>`
    }
}

const renderCounter = () => {
    if (count <= questionTime) {
        counter.innerHTML = count
        timeGauge.style.width = gaugeProgressUnit * count  + "px"
        count++
    } else {
        checkAnswer("E")
    } 
}

const renderScore = () => {
    let result = parseFloat(score)/(lastQuestionIndex + 1) * 100
    scoreContainer.innerHTML = `<span> ${result}% </span>`
    setTimeout(function(){
        quiz.style.display = "none"
        scoreContainer.style.display = "block"
    }, 1000);
    
}

const checkAnswer = (answer) => {
    if (questions[runningQuestionIndex].correctAnswer == answer) {
        score ++
        document.getElementById(runningQuestionIndex).style.backgroundColor = "green"
    } else {
        document.getElementById(runningQuestionIndex).style.backgroundColor = "red"
    }

    if (runningQuestionIndex  < lastQuestionIndex) {
        runningQuestionIndex++
        renderQuestion()
    }else {
        renderScore()
        clearInterval(TIMER)
    }
}

let questions = [
    {
        question: "How to tell if a programming language is turing complete?",
        imgSrc: "https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg",
        A: "Able to simulate any Turing machine",
        B: "Ask the professor",
        C: "Ask the professor",
        D: "Ask the professor",
        correctAnswer: "A"
    },
    {
        question: "Who invents The Coffee Test AI ?",
        imgSrc: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        A: "Steve Wozniak",
        B: "Tim Sweeney",
        C: "Sean Keller",
        D: "Jim Keller",
        correctAnswer: "A"
    },
    {
        question: "What is right about gamma correction in image processing ?",
        imgSrc: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        A: "Gamma is from the CRT display",
        B: "Libraries handle it correctly",
        C: "(128, 128, 128) emits ~20% light of (255, 255, 255)",
        D: "It’s safe to ignore it",
        correctAnswer: "C"
    },
    {
        question: "How do eyes perceive light intensity ?",
        imgSrc: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        A: "Nonlinearly, that's why we use gamma correction",
        B: "Linearly",
        C: "Rod recognize black-white",
        D: "Cone recognize colors",
        correctAnswer: "A"
    },
]

const questionTime = 10
let lastQuestionIndex = questions.length - 1
let runningQuestionIndex = 0

const gaugeWidth = 150
const gaugeProgressUnit = gaugeWidth / questionTime

let count = 0
let score = 0
let TIMER

start.addEventListener("click", startQuiz) 