


var wordToGuess;
var wordToGuessArray;
var guessedSoFar = [];
var totGuesses=0;
var guessLeftCntr =0;
var guessesLeftPTag ;
var countryImageTag;
var winsPTag;
var winsCntr = 0
var UniqueGuessedLetters=[];



var countries = [{ name: "united states", image: "./assets/images/UnitedStates.png" },
{ name: "india", image: "./assets/images/India.png" },
{ name: "france", image: "./assets/images/France.png" },
{ name: "ecuador", image: "./assets/images/Ecuador.png" },
{ name: "canada", image: "./assets/images/Canada.png" },
{ name: "australia", image: "./assets/images/Australia.png" },
{ name: "mexico", image: "./assets/images/Mexico.png" },
{ name: "bhutan", image: "./assets/images/Bhutan.png" },
{ name: "brazil", image: "./assets/images/Brazil.png" }

];



function startGame()
{
    guessesLeftPTag = document.getElementById("guessesLeft");
    winsPTag= document.getElementById("winsCntr");
    guessedLettersPTag=document.getElementById("guessedLetters");
    countryImageTag = document.getElementById("countryImage");
    countryImageTag.src = "./assets/images/world.png";
    var clueHolder = document.getElementById("ClueHolder");
    var myul = document.getElementById("myWord");
    if (myul)
    {
        myul.parentNode.removeChild(myul);
    }
   
        wordToGuess = undefined;
        wordToGuessArray=[];
        guessedSoFar = [];
        totGuesses=0;
        guessLeftCntr =0;
        guessesLeftPTag.innerHTML=0;
        winsPTag.innerHTML=0;
        guessedLettersPTag.innerHTML="";
        winsCntr = 0
        UniqueGuessedLetters=[];


    createClueHolder();
}

document.onkeyup = function (event) {
    checkGuesses(event);
    updateGame();
}


//update guessed so far...
function checkGuesses(event) {
    var letter = event.key.toLowerCase();
    if(UniqueGuessedLetters.indexOf(letter) === -1 && guessLeftCntr > 0)
    {
        UniqueGuessedLetters.push(letter);
        var pos = wordToGuess.name.indexOf(letter);
        var cnt=0
        
        while (pos !== -1) {
            guessedSoFar[pos] = letter;
            pos = wordToGuess.name.indexOf(letter, pos + 1);
            cnt++;
        }
        if(cnt > 0)
        {
            updateClueHolder(guessedSoFar);
            
        }
        else{
            guessLeftCntr--;
            guessesLeftPTag.innerHTML=guessLeftCntr;
        }
    }
    


}

//Generate random country name as word for Hangman
function getWord() {
    var i = Math.floor(Math.random() * countries.length);
    wordToGuess = countries[i];
    wordToGuessArray = wordToGuess.name.split("");

    for (var i = 0; i < wordToGuessArray.length; i++) {
        if(wordToGuessArray[i] !== " ")
        {
            guessedSoFar[i] = "_";
        }
        else
        {
            guessedSoFar[i] = "-";  
        }
        
    }

    return guessedSoFar;
}



//create dynmaic clue 

function createClueHolder() {
    var clueHolder = document.getElementById("ClueHolder");
    var c = document.createElement("ul");
    var guess;
    var word;
    word = getWord();
    totGuesses=word.length;
    guessLeftCntr=totGuesses;
    guessesLeftPTag.innerHTML=totGuesses;

    for (var i = 0; i < word.length; i++) {
        c.setAttribute("id", "myWord");
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");
        guess.innerHTML = word[i];

        //geusses.push(guess);
        clueHolder.appendChild(c);
        c.appendChild(guess);
    }
}

//update clue holder if guess is correct
function updateClueHolder(word) {


    var clueHolder = document.getElementById("ClueHolder");
    var myul = document.getElementById("myWord");
    myul.parentNode.removeChild(myul);

    var c = document.createElement("ul");
    var guess;


    for (var i = 0; i < word.length; i++) {
        c.setAttribute("id", "myWord");
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");
        guess.innerHTML = word[i];

        //geusses.push(guess);
        clueHolder.appendChild(c);
        c.appendChild(guess);
    }
}


function updateGame()
{
    guessedLettersPTag.innerHTML = UniqueGuessedLetters.toString();
    if (guessedSoFar.indexOf("_") === -1)
    {
         // guessed word correctly
         countryImageTag.src= wordToGuess.image;
         winsCntr++;
         winsPTag.innerHTML = winsCntr;
    }
    elseif(guessLeftCntr === 0) 
    {
        //no more guesses left


    }
    

}


