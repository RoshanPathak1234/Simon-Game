
const buttonColors = ["red", "blue", "green", "yellow"]

let gamePatterns = []

let userClickedPattern = []

let gameStarted = false
let level = 0

$(document).keypress(function(){
    if(!gameStarted)
    {
        $("#level-title").text("Level " + level)
        nextSequence()
        gameStarted = true
    }
})

$(".btn").click(function()
{
    let userClickedColor = $(this).attr("id")
    userClickedPattern.push(userClickedColor)
    playSound(userClickedColor)
    animatePress(userClickedColor)
    checkAnswer(userClickedPattern.length - 1)
})

const checkAnswer = (currentLevel) =>
{
    if(userClickedPattern[currentLevel] === gamePatterns[currentLevel])
    {
        if(gamePatterns.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else
    {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

const nextSequence = () =>
{
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level)
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePatterns.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

const playSound = (name) =>
{
    let music = new Audio(name + ".mp3")
    music.play()
}

const animatePress = (currentcolor) =>
{
    $("#" + currentcolor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed")
    },100)
}

const startOver = () =>
{
    gameStarted = false
    userClickedPattern = []
    gamePatterns = []
    level = 0
}