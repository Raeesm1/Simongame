/* Colours are loaded here so they can be called at random in next sequence */
var game = ["green", "red", "yellow", "blue"];
//  this is changed to true once any buttton has been pressed once at the start of the game
var started = false;
//  Loads the pattern which the game follows so we know whether the user is getting the answers correct
var gamePattern = [];
// The pattern the user follows is compared to gamePattern so we know whether they are answering the questions correctly or not
var userClickedPattern = [];
// Controls the level the user is on
var level = 0;
// Lets the program know when the game has ended so everything can be reset to the beginning
var end = false;
// Listens for a keypress and loads the users level and plays next sequence if started is false
$(document).keypress(function() {
    if(started == false)
    {
        level++;
        // This changes the text in intro to their level
        $("#intro").text("Level  " + level);
        $(".instructions").text(" ");
        nextSequence();
        started = true;
        end = false;
    }
});

function checkAnswer()
{
    // The users answer and the colour pattern the game has followed is entered into the function arrayEquals
    if(arrayEquals(userClickedPattern, gamePattern) == true)
    {

        if(end == false)
        {
            nextSequence();
            /* UserClickedPattern is emptied because every time the user gets an answer correct they
            have to re-enter the entire sequence plus the next colour which is randomly generated 
            from nextSequence() */
            userClickedPattern = [];
        }
    }
    else if(arrayEquals(userClickedPattern, gamePattern) == false)
    {
        /* Check the answer when the arrays are at the same length */
        if(userClickedPattern.length === gamePattern.length)
        {
            $("#intro").text("End game at level " + level + " you lose.");
            alert("You lose sorry");
            playSound("wrong");
            $("*").addClass("game-over");
            // Makes the user wait before the 200 milliseconds before the class is removed
            setTimeout(function() {
                $("*").removeClass("game-over");
            }, 200);
            startOver();
            displayText();
        }
        else
        {
            // Loops through the arrays to check if every element is correct
            var clickedPatternValue = userClickedPattern.length;
            for(var i = 0;i < clickedPatternValue; i++)
            {
                if(userClickedPattern[i] != gamePattern[i])
                {
                    $("#intro").text("End game at level " + level + " you lose.");
                    alert("You lose sorry");
                    playSound("wrong");
                    $("*").addClass("game-over");
                    setTimeout(function() 
                    {
                        $("*").removeClass("game-over");
                    }, 200);
                    displayText();
                    startOver();
                    break;
                }
            }
        }
    }
}

/* When either green, red, yellow or blue is pressed the code is executed */

$(".btn").on("click", function()
{
    if(started == false)
    {
        level++;
        // This changes the text in intro to their level
        $("#intro").text("Level  " + level);
        $(".instructions").text(" ");
        nextSequence();
        started = true;
        end = false;
    }
    else{
        $(this).fadeIn(100).fadeOut(100).fadeIn(100);
        var userChosenColour = $(this).attr("value");
        animatePress(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        console.log(gamePattern);
        checkAnswer();
    }
    
});

 /* Outputs a boolean value of true if they are both arrays, if they are equal in length and data type, 
 if the lengths of both the arrays are not 0, a.every goes over every value inside a and checks 
 the value against the index */

function arrayEquals(a, b)
{
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.length !== 0 && b.length !== 0 && a.every((val, index) => val === b[index]);
}



function nextSequence()
{
    $("#intro").text("Level " + level);
    /* stores a random number between 0 and 3 in rand */
    var rand = Math.floor(Math.random() * 4);
    var randomChosenColour = game[rand];
    gamePattern.push(randomChosenColour);
    setTimeout(function()
    {
        $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 1000);
    level++;


}

function displayText()
{

    var x = document.getElementById("textField");
    var y = document.getElementById("playBtn");
    if(x.style.display == "none")
    {
        x.style.display = "grid";
        y.style.visibility = "hidden";
    }
    else
    {
        x.style.display = "none";
        y.style.visibility = "visible";
    }

}


function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}


function animatePress(currentColour)
{
    
    $('.' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('.' + currentColour).removeClass("pressed");
    }, 100);

}

function startOver()
{
    end = true;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
    
}
