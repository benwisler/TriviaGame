var timeLeft = 11;
var timeLeft1 = 3;
var questionIndex = 0;
endTime = 10;
var imageQ1 = "assets/images/question1.jpg";
var imageQ2 = "assets/images/barney.webp";
var imageQ3 = "assets/images/dasbus.png";
var imageQ4 = "assets/images/hunnybunny.jpg";
var imageQ5 = "assets/images/evergreen.jpg";
var correctCounter = 0;
var wrongCounter = 0;
var unansweredCounter = 0;
var myQuestions = [
  {
    question: "Episode 'D'oh-in in the Wind', from season 10, featured Homer becoming a hippie while trying to find what the 'J' of his middle name stood for. Which name, revealed for the first time in this episode, is given as Homer's second name?",
    answers: ["Jason", "Jay", "Jebediah", "Jorge"],
    correctAnswer: "Jay",
    answerImage: imageQ1
  },
  {
    question: "'Days of Wine and D'oh'ses premiered in 2000 as the eighteenth episode of season 11. This episode features one of the characters overcoming his alcohol addiction and exploring new ventures, like driving a helicopter. Which character is this?",
    answers: ["Barney", "Homer", "Carl", "Lenny"],
    correctAnswer: "Barney",
    answerImage: imageQ2
  },
  {
    question: "In the season 9 episode 'Das Bus' who does the narrator say rescued the children from the island?",
    answers: ["Homer", "Sideshow Bob", "Lenny", "Moe"],
    correctAnswer: "Moe",
    answerImage: imageQ3
  },
  {
    question: "In the season 6 episode 'Lisa on Ice', Bart's childhood toy is revealed to named what?",
    answers: ["Radioactive Man", "Mr. Hunny Bunny", "Murtle The Turtle", "Winnie the Poop"],
    correctAnswer: "Mr. Hunny Bunny",
    answerImage: imageQ4
  },
  {
    question: "What is the street number of the Simpson home on Evergreen Terrace?",
    answers: ["345", "762", "221", "742"],
    correctAnswer: "742",
    answerImage: imageQ5
  }
];
function question() {
  console.log("here")
  $("#currentQuestion").html("<p><strong>" +

    myQuestions[questionIndex].question)
  $("#currentAnswers").html("</p><p class='answers'>" +
    myQuestions[questionIndex].answers[0] +
    "</p><p class='answers'>" +
    myQuestions[questionIndex].answers[1] +
    "</p><p class='answers'>" +
    myQuestions[questionIndex].answers[2] +
    "</p><p class='answers'>" +
    myQuestions[questionIndex].answers[3] +
    "</strong></p>");
}

function reset() {
  userGuess = "";
  questionIndex = 0;
  correctCounter = 0;
  wrongCounter = 0;
  unansweredCounter = 0;

}
function startTimer() {

  clock = setInterval(countDown, 1000);
  function countDown() {
    if (timeLeft1 < 1) {
      clearInterval(clock);
      gameOn();
    }
    if (timeLeft1 > 0) {
      timeLeft1--;
    }
    $("#timeDiv").html("Game Starts In: " + timeLeft1 + " seconds.");
  }
}
function timer() {
  clock3 = setInterval(countDown, 1000);
  function countDown() {

    if (timeLeft > 0) {
      timeLeft--;
    }
    else if (timeLeft < 1) {
      clearInterval(clock3);
      showAnswer();
    }
    $("#timeDiv").html("Time left to answer: " + timeLeft + " seconds.");
  }
}
function endGame() {
  if (correctCounter === myQuestions.length) {
    $("#currentQuestion").html("");
    $("#currentQuestion").append("<h2> Congratulations! Perfect Score! <br> You answered all " + correctCounter + " questions  correctly!</h2>");
    reset();
    $('#reset').html("<p class='answers'>" + "Start Over</p");
    $("#reset").unbind().click(nextQuestion)

  }
  else if (correctCounter != myQuestions.length) {
    $("#currentQuestion").html("");
    $("#currentQuestion").append("<h2>You answered " + correctCounter + " out of " + questionIndex + " questions correctly! And failed to answer " + unansweredCounter + " question(s) in time.</h2>");
    reset();
    $('#reset').html("<p class='answers'>" + "Start Over</p");
    $("#reset").unbind().click(nextQuestion)

  }
}
function gameOn() {
  nextQuestion();
  $("#currentAnswers").unbind().on("click", ".answers", function () {

    console.log(this)
    var userGuess = $(this).text();
    console.log(userGuess);
    if (userGuess === myQuestions[questionIndex].correctAnswer) {
      clearInterval(timeLeft);
      correct();
    }
    else {
      clearInterval(timeLeft)
      incorrect();
    }
  })
}
function correct() {

  $("#currentAnswers").html("");
  $("#timeDiv").html("");
  $("#currentQuestion").html("<h1>Correct!</h1><br>")
  $("#currentQuestion").append("The answer is indeed " + myQuestions[questionIndex].correctAnswer + "<br>" + '<img src="' + myQuestions[questionIndex].answerImage + '" height="300" width="300"/>');
  clearTimeout(clock3);
  correctCounter++;
  setTimeout(nextQuestion, 4000);


}
function incorrect() {
  $("#currentAnswers").html("");
  $("#timeDiv").html("");
  $("#currentQuestion").html("<h1>Incorrect!</h1><br>")
  $("#currentQuestion").append("The correct answer is " + myQuestions[questionIndex].correctAnswer + "<br>" + '<img src="' + myQuestions[questionIndex].answerImage + '" height="300" width="300"/>');
  clearTimeout(clock3);
  wrongCounter++;
  setTimeout(nextQuestion, 4000);

}
function showAnswer() {


  $("#currentAnswers").html("");
  $("#timeDiv").html("");
  $("#currentQuestion").html("<h1>Time's Up!</h1><br>")
  $("#currentQuestion").append("The correct answer is " + myQuestions[questionIndex].correctAnswer + "<br>" + '<img src="' + myQuestions[questionIndex].answerImage + '" height="300" width="300"/>');
  unansweredCounter++;
  setTimeout(nextQuestion, 4000);

}
function nextQuestion() {
  $("#reset").empty()
  $("#currentQuestion").html("");
  $("#currentAnswers").html("");
  questionIndex = unansweredCounter + wrongCounter + correctCounter;
  if (questionIndex < myQuestions.length) {
    console.log(questionIndex)
    timeLeft = 11;
    question();
    timer();
  }
  else {
    endGame();
  }
}

startTimer();
