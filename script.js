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
var question;
var choices_arr;
var realAnswer;

var newChoice;
var questionLength = questions.length;
var timeLength = questionLength * 15;
var score = 0;
var currentItem;
var userInfo = [];
localStorage.setItem("userInfo", userInfo);

appendQuizToDom();

function appendQuizToDom () {
    currentItem = 0;
    wholeStart.classList.remove("hide");
    wholeEnd.classList.add("hide");
    highScoreDiv.classList.add("hide");
    //appendStartScreenToDom();
}

function appendStartScreenToDom () {
    var start = document.createElement("h1");
    var context = document.createElement("p");
    var startButton = document.createElement("button");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("id", "start");
    context.setAttribute("id", "instruction");
    start.textContent = "CODING QUIZ";
    context.textContent = "This quiz will give you " + questionLength + " questions regarding coding concepts. Each question is multiple choice. You will have " + timeLength + " seconds to finish the quiz. If you get a question wrong, the timer will decrement by 15 seconds. Good Luck!";
    startButton.textContent = "START QUIZ";
    startScreen.appendChild(start);
    startScreen.appendChild(context);
    startScreen.appendChild(startButton);
}

function appendQuestionToDom () {
    console.log("in appendQuestionToDom"); //FOR DEBUG
    for (var i = 0; i < questions.length; i++) {
        if (currentItem - 1 == i) {
            question = questions[i].title;
            console.log("question = " + question); //FOR DEBUG
            realAnswer = questions[i].answer;
            console.log("answer = " + realAnswer); //FOR DEBUG
            newQuestion.textContent = question;

            listOfChoices.innerHTML = "";
            choices_arr = questions[i].choices;
            for (var j = 0; j < choices_arr.length; j++) {
                console.log(choices_arr[j]); //FOR DEBUG
                newChoice = document.createElement("li");
                newChoice.setAttribute("id", "choice");
                newChoice.setAttribute("data-item", choices_arr[j]);
                //console.log("data-answer = " + newChoice.dataset.answer); //FOR DEBUG
                newChoice.setAttribute("type", "button");
                newChoice.textContent = j+1 + ". " + choices_arr[j];
                listOfChoices.appendChild(newChoice);
            }
            console.log("done with loop"); //FOR DEBUG
        }
    }
}

function appendEndScreenToDom () {
    quiz.classList.add("hide");
    wholeEnd.classList.remove("hide");
    /*var initialText = document.createElement("h1");
    var printScore = document.createElement("p");
    var saveScore = document.createElement("div");
    var saveScoreText = document.createElement("p");
    var saveScoreInput = document.createElement("input");
    saveScoreInput.setAttribute("type", "text");
    saveScoreText.setAttribute("id", "saveText");
    saveScoreText.textContent = "Enter Initials";
    initialText.textContent = "All Done!";
    printScore.textContent = "Your Score is " + score;
    
    endScreen.appendChild(initialText);
    endScreen.appendChild(printScore);
    endScreen.appendChild(saveScore);
    saveScore.appendChild(saveScoreText);
    saveScore.appendChild(saveScoreInput);*/
}

function nextQuestion () {
    wholeStart.classList.add("hide");
    quiz.classList.remove("hide");
    console.log("in function nextQuestion"); //FOR DEBUG
    currentItem++;
    console.log("currentItem = " + currentItem); //FOR DEBUG
    if (currentItem > questions.length) {
        appendEndScreenToDom();
    } else {
        appendQuestionToDom();
    }
}

function compareAnswer (userAnswer) {
    console.log("inside compareAnswer"); //FOR DEBUG
    var rightOrWrong;
    if (userAnswer == realAnswer) {
        console.log("CORRECT ANSWER"); //FOR DEBUG
        result.textContent = "CORRECT!";
        score++;
    } else {
        console.log("WRONG ANSWER"); //FOR DEBUG
        result.textContent = "WRONG!";
    }
}

function saveScores () {
    var initials = userInput.value.trim();
    var info = {user: initials, score: score};
    //userInfo.push(info);
    console.log(initials); //FOR DEBUG
    var lastUser = localStorage.getItem("JSON.parse(userInfo)");
    console.log(lastUser); //FOR DEBUG
    //lastUser.push(info);
    localStorage.setItem("userInfo", JSON.stringify(lastUser));
}

function showHighScores () {
    wholeEnd.classList.add("hide");
    console.log("inside showHighScores"); //FOR DEBUG
    //saveScores();
    highScoreDiv.classList.remove("hide");

}

listOfChoices.addEventListener("click",function(e) {
    if (e.target && e.target.matches("li")) {
      console.log("button clicked"); //FOR DEBUG
      var userAnswer = e.target.dataset.item;
      console.log("user clicked on " + userAnswer); //FOR DEBUG
      compareAnswer(userAnswer);
      nextQuestion();
      }
  });

document.querySelector("#start").addEventListener("click", nextQuestion);
document.querySelector("#submitInitials").addEventListener("click", showHighScores);
//document.querySelector("#clearScores").addEventListener("click", nextQuestion);
document.querySelector("#startOver").addEventListener("click", appendQuizToDom);