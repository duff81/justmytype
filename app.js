let keyUpCont = $("#keyboard-upper-container"); //calls he uppercase letter keyboard
let keyLowCont = $("#keyboard-lower-container"); //calls the lowercase letter keyboard
let highlightPosition = 0; // this is beginning location of the highlight
let sentenceCounter = 0; //keeps track of which sentence in the array is being targeted
let letterCounter = 0; //keeps track of the lettercounter
let yellowBlock = $("#yellow-block"); //location of the the highligher 
const numberOfWords = 54; // this is the predefined amount of words total in all of the sentence array
let numberOfMistakes = 0; //running tally of the time the mistake function gets called which only gets called when you type incorrectly

//these are the predefined sentences you are trying to type correctly in the exercise
let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];
// let sentences = ["ten", "Too", "oat itain", "itant", "nee"]; test sentences very short
let sentenceDiv = $("#sentence"); //this is where on the html page the sentences are being displayed
let currentSentence = sentences[sentenceCounter]; //this is the actual sentence being displayed in the html
let lastSentence = sentences[4]; //this is me defining the last sentence- will be used to reset game and show score etc.
let targetLetter = currentSentence[letterCounter]; // the actual letter of the actual sentence you are trying to type
let target = $("#target-letter"); //this is the where the target letter is being displayed in the html
let feedbackDiv = $("#feedback"); //location on page where you will get your checks or X's
let gameStart = $.now(); //this is the time stamp that will be used to determine how long it takes to type out all of the sentences

keyUpCont.toggle(); //this is what is making only 1 keyboard display at a time 
sentenceDiv.append(currentSentence); // putting current sentence in the html to be read
target.append(targetLetter); //putting target letter in the html to be read

//this listens for the first key down and marks the time will be used late to determine how long the typing exercise takes
$(document).one("keydown", function () {
  gameStart
  console.log(gameStart);
});
// this is the big boy- starts by listeing for key down events or when a button is pushed
$(document).keydown(function (e) {
  if (e.keyCode == 16) { //this is the mechanic for toggling between upper and lower case keyboards
    // console.log('wup');
    keyUpCont.show();
    keyLowCont.hide();
  } else if (e.key != currentSentence[letterCounter]) { //this is how we are marking when the worng key is being pressed
    feedbackDiv.append("<span class='glyphicon glyphicon-remove'>");
    mistakes();
  } else if (e.key == currentSentence[letterCounter]) { //this is how we are listening and marking when the correct key is pressed and moving through target letter of the current sentence and moving the highlighter
    feedbackDiv.append("<span class='glyphicon glyphicon-ok'>");
    console.log(e);
    letterCounter++;
    highlightPosition = highlightPosition + 17;
    yellowBlock.css("margin-left", `${highlightPosition}px`);
    console.log(letterCounter);

    if (letterCounter === currentSentence.length) { //this is how we are switching to the next sentence
      makeSentence();
    }
  }
});
$(document).keyup(function (e) { //this is where the keyboard gets toggled when you press the shift key
  if (e.keyCode == 16) {
    keyUpCont.hide();
    keyLowCont.show();
  }
});

$(document).keypress(function (e) { //this is where the the keyboard letter being pressed highlight happens
  let key = e.keyCode;
  $("#" + key).addClass("highlight");
  $(document).keyup(function (e) {
    $("#" + key).removeClass("highlight");
  });
  target.empty(targetLetter); //this is where the target letter gets removed on the release of the key before the new target letter gets added on the press of the key
  if (sentenceCounter > 4) { //this is where the game over gets defined and the new game function gets called
    newGame();
  } else target.append(currentSentence[letterCounter]); //this is where the new target letter get put onto the html
});

// this is where the new sentences get made
function makeSentence(e) {
  sentenceCounter++; //goes to the next sentence in the array

  currentSentence = sentences[sentenceCounter]; //sets the new current sentence 
  feedbackDiv.empty(); //empties out the feedback display in the html
  letterCounter = 0; //resets letter counter for the new sentence
  // yellowBlock.empty(yellowBlock);
  sentenceDiv.empty(currentSentence);//empties current sentence from html
  sentenceDiv.append(currentSentence);// adds new current sentence to html
//resets highlighter position
  highlightPosition = 0; 
  yellowBlock.css("margin-left", 0);
}
function mistakes() {//this is where the number of mistakes gets populate
  numberOfMistakes++;
  console.log(numberOfMistakes);
}
function newGame() {//this handles end of game stuff
  let gameEnd = $.now();//grabs the time when game is over
  console.log(gameEnd);
  let minutes = (gameEnd - gameStart) / 60000;//this calculate entire game time in milliseconds and converts it to minutes
  let finalScore = numberOfWords / Math.round(minutes) - 2 * numberOfMistakes;//calculates your final results
  let results = `<span>Wow, you typed ${finalScore} words per minute!!! Would you like to play again?</span>`;//contents of the results
  console.log(numberOfWords, Math.round(minutes), numberOfMistakes);
  target.empty(target);//empties target location
  let resetButton = $("<button type='button'> YES</button>");//creates reset game button
  let cancelButton = $("<button type= 'button'> NO </button>");//creates cancel button
  cancelButton.click(function () {
    window.location = "https://www.keybr.com/";//defines what happens when button is pressed
  });
  resetButton.click(function () {//defines what will happen when button is pressed
    location.reload();
  });
  feedbackDiv.append(results);//this is where results will be displayed
  target.append(resetButton, "   ");//adds reset button in html to be displayed and give a little space between other button *probably not best practice if i had to guess
  target.append(cancelButton);//adds cancel button in html to be displayed
}

