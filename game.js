var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var touchScreenMessage = "Touch the background to start"

buttons = $(".btn");
for (var i=0; i < buttons.length; i++) {
    button = buttons[i];
    button.addEventListener("click", handleClick);
}

if (supportsTouch) {
    updateTitle(touchScreenMessage)
}

$("html").on("keydown touchstart", function(event) {
    if (level === 0) {
        setTimeout(nextSequence, 500);
    }
});

function nextSequence() {
    if (level === 0) {
        $(".score").remove();
        $(".btn").show();
    }
    updateTitle("Level " + level);
    randomChosenColor = pickRandomColor();
    gamePattern.push(randomChosenColor);
    animateBlink(randomChosenColor);
    playSound(randomChosenColor);
    level += 1;
}

function pickRandomColor() {
    var buttonColors = ["red", "blue", "green", "yellow"];
    var randomNumber = random();
    var randomColor = buttonColors[randomNumber];
    var lastColor = gamePattern[gamePattern.length - 1];
    if (randomColor === lastColor) {
        return pickRandomColor()
    }
    return randomColor;
}

function handleClick() {
    if (gamePattern.length === 0) {
        return;
    }
    var userChosenColor = this.id;
    playSound(userChosenColor);
    togglePressedClass(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer();
}

function checkAnswer() {
    console.log(gamePattern);
    var index = userClickedPattern.length - 1;

    if (userClickedPattern[index] != gamePattern[index]) {
        gameOver();
        return   
    }

    if (userClickedPattern.length === gamePattern.length) {
        console.log("Calling next sequence");
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function gameOver() {
    playSound("game-over");
    toggleBodyClass();
    if (supportsTouch) {
        $("#level-title").after('<br><h2 class="score">' + touchScreenMessage + '</h2>')
    } else {
        $("#level-title").after('<br><h2 class="score">Press any key to restart</h2>')
    }
    $("#level-title").after('<h2 class="score">Your score is ' + gamePattern.length + '</h2>')
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    updateTitle("GAME OVER")
    $(".btn").hide();
}

function updateTitle(string) {
    $("#level-title").text(string)
}

function random() {
    var n = Math.random();
    n = n * 4;
    n = Math.floor(n);
    return n;
}

function animateBlink(color) {
    $("." + color).fadeOut(100).fadeIn(200);
}

function toggleBodyClass() {
    $("body").toggleClass("game-over");
    setTimeout(function() {
        $("body").toggleClass("game-over");
    }, 100);
}

function togglePressedClass(color) {
    $("." + color).toggleClass("pressed");
    setTimeout(function() {
        $("." + color).toggleClass("pressed");
    }, 100);
}

function playSound (key) {
    switch (key) {
        case "red":
            var audio = new Audio('sounds/red.mp3');
            break;
        
        case "blue":
            var audio = new Audio('sounds/blue.mp3');
            break;
        
        case "green":
            var audio = new Audio('sounds/green.mp3');
            break;
        
        case "yellow":
            var audio = new Audio('sounds/yellow.mp3');
            break;
        
        case "game-over":
            var audio = new Audio('sounds/wrong.mp3');
            break;
    }
    audio.play();
}


$("footer").on("click", function() {
    alert("Repeat the flashing pattern in the same order as they flash for each turn. \nWait for the next flash after each turn");
});