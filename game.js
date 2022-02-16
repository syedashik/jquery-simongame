// Main Codes..........

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;


$(document).on("keydown", function(event) {

  if (level === 0) {

    level++;
    $("#level-title").text("Level " + level);
    setTimeout(nextSequence, 100);

  }
});



$(".btn").on("click", function() {

  if (level > 0) {

    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    equalArray(gamePattern, userClickedPattern);
  }
});


// End of Main Codes..........


// Functions...................


function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);

}


function playSound(name) {

  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


function gameOver() {

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

}


function equalArray(a, b) {
  var i;
  if (a.length === b.length) {
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return wrongAnswer();
      }
    }
    return rightAnswer();
  } else if (a.length > b.length) {
    for (i = 0; i < b.length; i++) {
      if (a[i] !== b[i]) {
        return wrongAnswer();
      }
    }
  } else {
    return rightAnswer();
  }

}


function rightAnswer() {

  level++;
  $("#level-title").text("Level " + level);
  setTimeout(nextSequence, 1000);

}


function wrongAnswer() {
  playSound("wrong");
  gameOver();
  $("#level-title").text("Game Over, Press Any Key To Restart");
  level = 0;
  gamePattern = [];
}


// End of Functions..........
