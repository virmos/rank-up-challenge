const mainScreen = 
`
<header id="header">
<div class="d-flex flex-column" id="menu">
    <div id="start">Start Quiz!</div>
    <div id="quiz" style="display: none">
        <div id="question"></div>
        <div id="quizImg"></div>
        <div id="choices">
            <div class="choice" id="A""></div>
            <div class="choice" id="B""></div>
            <div class="choice" id="C""></div>
            <div class="choice" id="D""></div>
        </div>
        <div id="timer">
            <div id="counter"></div>
            <div id="btimeGauge"></div>
            <div id="timeGauge"></div>
        </div>
        <div id="progress">
        </div>
    </div>
    <div id="scoreContainer" style="display: none">
    </div>
</div>
</header>
`

function onload() {
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

    const renderQuestion = () => {
        let q = questions[runningQuestionIndex]
        quizImg.innerHTML = `<img width="200px" height="200px" src="${q.imgSrc}">`
        question.innerHTML = `<p>"${q.question}"</p>`
        choiceA.innerHTML = q.A
        choiceB.innerHTML = q.B
        choiceC.innerHTML = q.C
        choiceD.innerHTML = q.D
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
            progress.innerHTML += `<div class="prog" id="${qIndex}"</div>`
        }
    }


    const renderCounter = () => {
        if (count <= questionTime) {
            counter.innerHTML = count
            timeGauge.style.width = gaugeProgressUnit * count  + "px"
            count++
        } else {
            count = 0
            answerIsWrong()
            if (runningQuestionIndex < lastQuestionIndex) {
                runningQuestionIndex++
                renderQuestion()
            }else {
                clearInterval(TIMER)
                // renderScore()
            }
        }
    }

    const checkAnswer = (evt) => {
        let answer = evt.myParam
        if (questions[runningQuestionIndex].correctAnswer == answer) {
            score ++
            document.getElementById(runningQuestionIndex).style.backgroundColor = "green"
        } else {
            document.getElementById(runningQuestionIndex).style.backgroundColor = "red"
        }

        count = 0
        if (runningQuestionIndex  < lastQuestionIndex) {
            runningQuestionIndex++
            renderQuestion()
        }else {
            clearInterval(TIMER)
        }
    }

    let questions = [
        {
            question: "How to tell if a programming language is turing complete?",
            imgSrc: "https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg",
            A: "Ask the professor",
            B: "Ask the professor",
            C: "Ask the professor",
            D: "Ask the professor",
            correctAnswer: "A"
        },
        {
            question: "Is CSS a programming language?",
            imgSrc: "",
            A: "Yes",
            B: "Yes, it is",
            C: "No, it isn't",
            D: "No",
            correctAnswer: "D"
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
    
    choiceA.addEventListener("click", checkAnswer) 
    choiceB.addEventListener("click", checkAnswer) 
    choiceC.addEventListener("click", checkAnswer) 
    choiceD.addEventListener("click", checkAnswer) 

    choiceA.myParam = "A"
    choiceB.myParam = "B"
    choiceC.myParam = "C"
    choiceD.myParam = "D"

    start.addEventListener("click", startQuiz) 
}

export default {
    content: mainScreen,
    onload: onload,
}