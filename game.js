//Game Starter
var called = false;
var level = 0;
$(document).keydown(function(){
    if (called == false){
        called = true;
        $("#level-title").text("Level " + level);
        nextSequence();    
    }
    else{
        console.log("You can only Run the Game once!");
    }

});


var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]

//Computer
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();

    level++;
    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColour);
    
    userClickedPattern = [];
}

//User
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    
    checkAnswer(userChosenColour);
});


//Checker
var positionPattern = 0;
function checkAnswer(userChosenColour){
    if(userChosenColour == gamePattern[positionPattern]){
        console.log("Correct");
        positionPattern++;
        if (positionPattern < level){
            console.log();
        }
        else {
            positionPattern = 0;
            console.log("Next Level")
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }
    else{
        console.log("Incorrect");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

//Restart
function startOver(){
    level = 0;
    gamePattern = [];
    positionPattern = 0;
    called = false;
}

//Sounds
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//Color Animation
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}
