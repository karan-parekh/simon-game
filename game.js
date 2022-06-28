var gamePattern = [];
var userClickedPattern = [];
var level = 0;

buttons = $(".btn");
for (var i=0; i < buttons.length; i++) {
    button = buttons[i];
    button.addEventListener("click", handleClick);
}

$("html").on("keydown touchstart", function() {
    if (level === 0) {
        setTimeout(nextSequence, 300);
    }
});

function nextSequence() {
    $("h2").hide();
    $(".btn").show();
    updateTitle("Level " + level)
    var buttonColors = ["red", "blue", "green", "yellow"];
    var randomNumber = random();
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateBlink(randomChosenColor);
    playSound(randomChosenColor);
    level += 1;
}

function handleClick() {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    togglePressedClass(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer();
}

function checkAnswer() {
    console.log(gamePattern);
    console.log(userClickedPattern);
    var index = userClickedPattern.length - 1;
    console.log("index: ", index);

    if (userClickedPattern[index] != gamePattern[index]) {
        console.log("!!!! GAME OVER !!!!");
        gameOver();
        return   
    }

    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
        console.log("Calling next sequence");
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function gameOver() {
    playSound("game-over");
    toggleBodyClass();
    $("h1").after('<br><h2 class="score">Press any key to restart</h2>')
    $("h1").after('<h2 class="score">Your score is ' + gamePattern.length + '</h2>')
    console.log("YOU SCORED: " + gamePattern.length);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    updateTitle("GAME OVER!")
    $(".btn").hide();
}

function updateTitle(string) {
    $("h1").text(string)
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
    console.log("Toggling class");
    $("body").toggleClass("game-over");
    setTimeout(function() {
        $("body").toggleClass("game-over");
    }, 100);
}

function togglePressedClass(color) {
    console.log("Toggling class");
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
