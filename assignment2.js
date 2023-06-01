//references:
//https://github.com/beaucarnes/simon-game
//https://www.w3schools.com/js/default.asp
//https://stackoverflow.com/questions/2696692/setinterval-vs-settimeout



let seq = [];
let playerSeq = [];
let flash;
let playerturn;
let correct;
let compTurn;
let intervalId;
let highScore = 0;
let noise = true;


const turnCounter = document.querySelector("#turn-counter");
const turnCounter2 = document.querySelector("#turn-counter2");
const circle1 = document.querySelector('.circle1');
const circle2 = document.querySelector('.circle2');
const circle3 = document.querySelector('.circle3');
const circle4 = document.querySelector('.circle4');
const startButton = document.querySelector("#start");
const on = document.querySelector('.on');

startButton.addEventListener('click', function() { // function to link the start button with the play function
        
    on.style.backgroundColor = "green";  // turn the on/off button into green after the start button is pressed  
    setTimeout(() =>{ // guarantee a delay of 3 seconds for the game start.
           play();
    },1000);
});

function play() {
    seq = []; //empty array for the computer store random numbers from 1 to 4;
    playerSeq = []; // empty array for the player store his answers;
    flash = 0;
    intervalId = 0;
    playerturn = 1;
    turnCounter.innerHTML = 1;
    turnCounter2.innerHTNL = 1;
    correct = true;
    for (var i = 0; i < 50; i++) { // for loop to fill up seq array with random numbers to flash the colored circles.
      seq.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() { //function to check if its time to go another turn
    startButton.disabled = true;

    if (flash === playerturn) {
        clearInterval(intervalId); // no more flashes
        compTurn = false;
        clearColor();    
    }

    if(compTurn) { // if its computer turn it will flash randomly the circles
        clearColor(); // leave it with the original collor
        setTimeout(() => { // flash randomly one of the circles.
            if(seq[flash] == 1) one();
            if(seq[flash] == 2) two();
            if(seq[flash] == 3) three();
            if(seq[flash] == 4) four();
            flash++;
    },200);         
    }
    else{
        clearColor();
    }
}

function one() { // when it is called, flashes the circles making lighter colours
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    circle1.style.backgroundColor = "lightgreen";
}
function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    circle2.style.backgroundColor = "tomato";
}
function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    circle3.style.backgroundColor = "lightyellow";
}
function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    circle4.style.backgroundColor = "lightskyblue";
}

function clearColor() { //when it is called, the colors back to the original color.
    circle1.style.backgroundColor = "green";
    circle2.style.backgroundColor = "darkred";
    circle3.style.backgroundColor = "darkgoldenrod";
    circle4.style.backgroundColor = "blue";
}

function flashColor(count) { //function to flash all the circles when the game finishes.
    
    for (let i = 0; i < count; i++) { // for loop to make the colored circles flashes 5 times
        setTimeout(() => {
        circle1.style.backgroundColor = "lightgreen";
        circle2.style.backgroundColor = "tomato";
        circle3.style.backgroundColor = "lightyellow";
        circle4.style.backgroundColor = "lightskyblue";
        setTimeout(() => {
          clearColor();
        }, 200);
        }, i*500); // I had to put a delay so the 5 flashes don't lit at the same time
    }
}

circle1.addEventListener('click', function(){
    playerSeq.push(1); // insert player's answer in the playerSeq array.
    check(); // check if the answet is correct
    one(); //  flash the circle when it's is clicked;
    setTimeout(() =>{
        clearColor(); // flash out after 300mm second           
    }, 300); // this is the amount of time that the circle flashe when you ckick on it
})

circle2.addEventListener('click', function(){ //same as above
    playerSeq.push(2);
    check();
    two();
    setTimeout(() =>{
        clearColor();            
    }, 300);
})
circle3.addEventListener('click', function(){ //same as above
    playerSeq.push(3);
    check();
    three();    
    setTimeout(() =>{
        clearColor();            
    }, 300);
})
circle4.addEventListener('click', function(){ // same as above
    playerSeq.push(4);
    check();
    four();
    setTimeout(() =>{
        clearColor();            
    }, 300);
    
})

function check() { // it checks if the player is following the signs correctly or not. if not the game is over.
    
    if ((playerSeq[playerSeq.length-1] !== seq[playerSeq.length-1]))
        correct = false;
    if (correct == false){ //if the player looses the game:
        if (noise) {
            let audio = document.getElementById("fail");
            audio.play();
        }
        noise = true;
        flashColor(5);     // call the function flashColor to flash 5 times
        on.style.backgroundColor = "red"; // button on/off becomes red
        setTimeout(() => {
            turnCounter.innerHTMK = playerturn-1; // guarantees that its counting the player right sequence rather the computer sequences
            clearColor();
        if (playerturn - 1 > highScore) { //if statement to get the higher score
            highScore = playerturn - 1; // Update high score if current score is higher
            turnCounter2.innerHTML = highScore; // link java cript with the html, to show the values on the screen
            }        
        }, 800);
        startButton.disabled = false; // when the game is over, the start button can be pressed again        
    }
    if(playerturn == playerSeq.length && correct){ //if the player is not making mistakes, keep playing increment the playerturn
        playerturn++;
        playerSeq = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = playerturn-1;
        if(playerturn>=0){                   
            clearInterval(intervalId); // clear any previous intervals   
            intervalId = setInterval(gameTurn, 800); //to implement hiher speed between intervals as long the playerturn increments
        }
        if(playerturn>5){                  
            clearInterval(intervalId);     
            intervalId = setInterval(gameTurn, 700);//to implement hiher speed between intervals as long the playerturn increments
        }
        if(playerturn>9){
            clearInterval(intervalId);      
            intervalId = setInterval(gameTurn, 550);//to implement hiher speed between intervals as long the playerturn increments
        }
        if(playerturn>13){
            clearInterval(intervalId);      
            intervalId = setInterval(gameTurn, 400);//to implement hiher speed between intervals as long the playerturn increments
        }                
    }   
}