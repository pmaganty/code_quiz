/*************************START: VARIABLE DEFINITIONS & INITIALIZATIONS*************************/
var result = document.querySelector("#result");
var newQuestion = document.querySelector("#question");
var listOfChoices = document.querySelector("#choices");
var startScreen = document.querySelector("#startScreen");
var endScreen = document.querySelector("#endScreen");
var wholeStart = document.querySelector("#wholeStart");
var wholeEnd = document.querySelector("#wholeEnd");
var quiz = document.querySelector("#quiz");
var mainDiv = document.querySelector("#main_div");
var submitInitials = document.querySelector("#submitInitals");
var userInput = document.querySelector("#userInput");
var highScoreDiv = document.querySelector("#highScoreDiv");
var time = document.querySelector("#time");
var highScoreList = document.querySelector("#highScoreList");
var easyScores = document.querySelector("#easyScores");
var hardScores = document.querySelector("#hardScores");
var advancedScores = document.querySelector("#advancedScores");
var question;
var choices_arr;
var realAnswer;
var questions_arr;

var newChoice;
var questionLength = 5;
var timeLength = questionLength * 15;
var score = 0;
var currentItem; 
var quiz_type = 0;
var timeLeft = timeLength;
var wrong_answer = 0;
var viewScores = 0;
var userInfo = [];
localStorage.setItem('userInfo', JSON.stringify(userInfo));
/*************************END: VARIABLE DEFINITIONS & INITIALIZATIONS*************************/






/*************************START: FUNCTION DEFINITIONS*************************/
function appendQuizToDom () {
    currentItem = 0;
    wholeStart.classList.remove("hide");
    document.querySelector("#instruction").textContent = "This quiz will give you " + questionLength + " questions regarding coding concepts. Each question is multiple choice. You will have " + timeLength + " seconds to finish the quiz. If you get a question wrong, the timer will decrement by 15 seconds. Good Luck!";
    wholeEnd.classList.add("hide");
    highScoreDiv.classList.add("hide");
}

function appendQuestionToDom (questions) {
    for (var i = 0; i < questions.length; i++) {
        if (currentItem - 1 == i) {
            question = questions[i].title;
            realAnswer = questions[i].answer;
            newQuestion.textContent = question;

            listOfChoices.innerHTML = "";
            choices_arr = questions[i].choices;
            for (var j = 0; j < choices_arr.length; j++) {
                newChoice = document.createElement("button");
                var extraLine = document.createElement("br");
                newChoice.setAttribute("type", "button");
                newChoice.setAttribute("id", "choice");
                newChoice.setAttribute("data-item", choices_arr[j]);
                newChoice.textContent = j+1 + ". " + choices_arr[j];
                newChoice.setAttribute("style", "margin-top: 10px;")
                listOfChoices.appendChild(newChoice);
                listOfChoices.appendChild(extraLine);
            }
        }
    }
} 

function appendEndScreenToDom () {
    quiz.classList.add("hide");
    wholeEnd.classList.remove("hide");
    document.querySelector("#score").textContent = "Your Score = " + score;
}

function nextQuestion () {
    wholeStart.classList.add("hide");
    quiz.classList.remove("hide");
    currentItem++;
    if (quiz_type == 1) {
        questions_arr = easy_questions;
    } else if (quiz_type == 2) {
        questions_arr = hard_questions;
    } else if (quiz_type == 3) {
        questions_arr = advanced_questions;
    }

    if (currentItem > questions_arr.length) {
        appendEndScreenToDom();
    } else {
        appendQuestionToDom(questions_arr);
    }
}

function compareAnswer (userAnswer) {
    var rightOrWrong;

    if (userAnswer == realAnswer) {
        result.textContent = "CORRECT!";
        result.classList.add("showResultBorder");
        setTimeout(function(){result.textContent = ""; result.classList.remove("showResultBorder");}, 500);
        score++;
    } else {
        result.textContent = "WRONG!";
        result.classList.add("showResultBorder");
        setTimeout(function(){result.textContent = ""; result.classList.remove("showResultBorder");}, 500);
        wrong_answer = 1;
    }
}

function saveScores () {
    var initials = userInput.value.trim();
    var info;
    if (initials == "") {
        info = {user: "unknown", score: score, quiz: quiz_type};
    } else {
        info = {user: initials, score: score, quiz: quiz_type};
    }
    var lastUser = JSON.parse(localStorage.getItem('userInfo'));
    lastUser.push(info);
    localStorage.setItem("userInfo", JSON.stringify(lastUser));
}

function showHighScores () {
    wholeEnd.classList.add("hide");
    wholeStart.classList.add("hide");
    if (viewScores == 0) {
        saveScores();
    }
    viewScores = 0;
    highScoreDiv.classList.remove("hide");
    appendHighScoresToDom();
}

function appendHighScoresToDom () {
    easyScores.innerHTML = "";
    hardScores.innerHTML = "";
    advancedScores.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem('userInfo'));
    var newHighScore;
    for (var i = 0; i < highScores.length; i++) {
        newHighScore = document.createElement("h6");
        newHighScore.textContent = i+1 + ". " + highScores[i].user + " - " + highScores[i].score;
        newHighScore.classList.add("eachHighScore");
        if (highScores[i].quiz == 1) {
            easyScores.appendChild(newHighScore);
        } else if (highScores[i].quiz == 2) {
            hardScores.appendChild(newHighScore);
        } else if (highScores[i].quiz == 3) {
            advancedScores.appendChild(newHighScore);
        }
    }
}

function quizTimer () {
    var timeInterval = setInterval(function() {

        if (timeLeft <= 0 || currentItem > questions_arr.length) {
            time.textContent = "Time: 0";
            appendEndScreenToDom();
            clearInterval(timeInterval);
        } else {
            if (wrong_answer == 1) {
                timeLeft = timeLeft - 15;
            } else {
                timeLeft--;
            }
            time.textContent = "Time: " + timeLeft;
        }
        wrong_answer = 0;
    }, 1000);
}

function resetVars() {
    score = 0; 
    timeLeft = timeLength; 
    time.textContent = "Time: " + timeLeft;
}

/*************************END: FUNCTION DEFINITIONS*************************/





/*************************START: EVENT LISTENER DECLARATIONS*************************/
listOfChoices.addEventListener("click",function(e) {
    if (e.target && e.target.matches("button")) {
      console.log("button clicked"); //FOR DEBUG
      var userAnswer = e.target.dataset.item;
      console.log("user clicked on " + userAnswer); //FOR DEBUG
      compareAnswer(userAnswer);
      nextQuestion();
    }
});
document.querySelector("#easy_start").addEventListener("click", function() {quiz_type = 1; resetVars(); quizTimer(); nextQuestion();});
document.querySelector("#hard_start").addEventListener("click", function() {quiz_type = 2; resetVars(); quizTimer(); nextQuestion();});
document.querySelector("#advanced_start").addEventListener("click", function() {quiz_type = 3; resetVars(); quizTimer(); nextQuestion();});
document.querySelector("#submitInitials").addEventListener("click", showHighScores);
document.querySelector("#clearScores").addEventListener("click", function() {
    easyScores.innerHTML = ""; hardScores.innerHTML = ""; advancedScores.innerHTML = ""; 
    localStorage.clear(); localStorage.setItem('userInfo', JSON.stringify(userInfo));
    });
document.querySelector("#startOver").addEventListener("click", appendQuizToDom);
document.querySelector("#viewHighScores").addEventListener("click", function() {viewScores = 1; showHighScores();});

/*************************END: EVENT LISTENER DECLARATIONS*************************/




/**********************************************************/
/***********CALLING FUNCTION TO INITIALIZE WEBSITE*********/
appendQuizToDom();
/**********************************************************/
