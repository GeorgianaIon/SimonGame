var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
playSound(randomChosenColour);
$("h1").html("Level "+level);

level++;

}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length);

})

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  }, 100);
}

$(document).keypress(function(){
  while (!started){
    nextSequence();
    $("h1").html("Level 0");
    started=true;
  }
})

function checkAnswer(currentLevel){

    for(var i=0; i<userClickedPattern.length; i++)
    {
      console.log(i);
      if(!(userClickedPattern[i]==gamePattern[i]) || !(userClickedPattern[currentLevel-1]==gamePattern[currentLevel-1]))
      {
        console.log("WRONG, you clicked "+userClickedPattern[i]+" and it was "+gamePattern[i]);
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over")
        }, 200);
        console.log(userClickedPattern[userClickedPattern.length-1]);
        console.log(gamePattern[gamePattern.length-1]);
        $("h1").html("Game over, Press any key to restart");
        userClickedPattern=[];
        startOver();
      }
      else if (userClickedPattern.length==gamePattern.length)
      {
            setTimeout(nextSequence, 1000);
            console.log("GOOD, you clicked "+userClickedPattern[i]+" and it was "+gamePattern[i]);
            console.log(userClickedPattern[userClickedPattern.length-1]);
            console.log(gamePattern[gamePattern.length-1]);
            userClickedPattern=[];

      }
    }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
