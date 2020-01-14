var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var correctAnswer = false;
var gameStarted = false;

// Press spacebar to start the game!
$(document).keypress(function(e) {
  if (e.keyCode == 13 && level == 1 && !gameStarted) {
    gameStarted = true;
    $("h2").css("visibility", "hidden");
    var nextColor = generateRandomColor();
    gamePattern.push(nextColor);
    playSound(gamePattern[0]);
    pressdEffect(gamePattern[0]);
    $("h1").text("Level " + level);
  }
});

$(".btn").click(function() {
  if(gameStarted) {
    // Store the user clicked color to userClickedPattern array.
    var clickedColor = $(this).attr("id");
    pressdEffect(clickedColor);
    playSound(clickedColor);
    userClickedPattern.push(clickedColor); // Save user clicked color to userClickedPattern array.

    // Check if all the userClickedPattern element are the same as the element in gamePattern.
    // userChosenColour.length <= gamePattern.length.
    for(var i = 0; i < userClickedPattern.length; i++) {
      if(checkAnswer(i)) {
        correctAnswer = true;
      } else {
        correctAnswer = false;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        gameOver();
      }
    }

    // If both arrays are exactly the same(same elements and length), go to next level.
    if(userClickedPattern.length == gamePattern.length && correctAnswer) {
      setTimeout(function() {
        goToNextLevel();
      },400);
      console.log("Go to next level!");
    }
  }
});

function checkAnswer(nThClick) {
  var correctAnswer = false;
  if (gamePattern[nThClick] == userClickedPattern[nThClick]) {
    correctAnswer = true;
  } else {
    correctAnswer = false;
  }
  return correctAnswer;
}

function goToNextLevel() {
  level++;
  userClickedPattern = [];
  AddNextSequence();
  $("h1").text("Level " + level);
  correctAnswer = false;
}

// Add new color to the sequence.
function AddNextSequence() {
  var nextColor = generateRandomColor();
  gamePattern.push(nextColor); // Save next color to gamePattern array.
  setTimeout(function() {
    pressdEffect(nextColor);
  }, 600);
}

// Initialize the game 1.5 seconds after the game is over.
function gameOver() {
  $("h1").text("Game Over 💔");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 150);
  gameStarted = false;
  setTimeout(function() {
    initializeGame();
  }, 1500);
}

// Initialize the game by resetting everything.
function initializeGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
  $("h2").css("visibility", "visible");
  $("h1").text("Press [ Enter ] to Start");
}

// This function play a sound according to the colors: green, red, yellow, and blue.
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  console.log(color);
}

// This function create a CSS effect for the buttons.
function pressdEffect(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 300);
}

// Generate random color from green, red, yellow, and blue.
function generateRandomColor() {
  randomColor = buttonColors[Math.floor(Math.random() * 4)];
  return randomColor;
}
