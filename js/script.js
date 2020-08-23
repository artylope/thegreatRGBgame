let colors=[];
let noOfColors = 9;
let rgbToGuess;
let score = 0;
let gameFeedbackDisplay = document.getElementById('game-feedback');

let newColorsBtn = document.getElementById('new-colors');
newColorsBtn.addEventListener('click', getNewColors);

function getNewColors(){
    generateAllRGBColors();
    pickColor();
}

let resetGame = document.getElementById('reset-game');
resetGame.addEventListener('click', function(){
    generateAllRGBColors();
    pickColor();
    score = 0;
    renderScore();
});

//generate a random rgb value
function generateARgbValue(){
    let rValue = Math.floor(Math.random() * 256);
    let gValue = Math.floor(Math.random() * 256);
    let bValue = Math.floor(Math.random() * 256);
    
    let rgbValue = `rgb(${rValue},${gValue},${bValue})`;

    return rgbValue;  
}


//generate colors for chosen no of colors
function generateAllRGBColors(){
    for(var i =0; i< noOfColors; i++){
        console.log('in loop');
        let rgbValue = generateARgbValue();
        console.log(rgbValue);
        colors[i] = rgbValue;
    }

    displaySquares();
}

//render the squaresin the DOM in the generated RGB
function displaySquares(){
    let squaresContainer = document.getElementById('squares-container');
    squaresContainer.innerHTML='';

    for(var i =0; i< noOfColors; i++){
        let square = document.createElement('div');
        console.log(squaresContainer);
        square.classList.add('square');
        square.style.backgroundColor = colors[i];
        square.addEventListener('click', function(){
            console.log(this.style.backgroundColor);
            checkColorMatch(this.style.backgroundColor,this);
        })
        squaresContainer.appendChild(square);
    }
}

function renderScore(){
    let scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerHTML = score;
}

//pick one number out of the noOfColors to be the picked color
function pickColor(){
    let pickedNumber = Math.floor(Math.random() * noOfColors);
    let pickedColor =  colors[pickedNumber];
    console.log('pickedColor',pickedNumber +1 , pickedColor);
    let display = document.getElementById('rgb-to-guess');
    display.innerHTML = `<h2>Guess which is ${pickedColor.toUpperCase()} ?</h2>`
    rgbToGuess = pickedColor;
    return pickedColor;
}

function checkColorMatch(rgb,element){
    console.log(rgb.replace(/\s*,\s*/g, ","));
    console.log(rgbToGuess.replace(/\s*,\s*/g, ","));
    if(rgb.replace(/\s*,\s*/g, ",")===rgbToGuess.replace(/\s*,\s*/g, ",")){
        console.log('yay correct');
        gameFeedbackDisplay.innerHTML = 'Yay correct!';
        gameFeedbackDisplay.className = "game-feedback correct";
        score++;
        renderScore();
        
        setTimeout( function(){ 
            getNewColors();
         }, 500
        );
    } else {
        console.log(element);
        element.style.opacity= 0;
        gameFeedbackDisplay.innerHTML = 'Wrong try again!';
        gameFeedbackDisplay.className = "game-feedback wrong";
        console.log('wrong try again');
        
    }
    setTimeout( function(){ 
        gameFeedbackDisplay.innerHTML = '';
        gameFeedbackDisplay.className = "game-feedback";
     }, 2000
    );
}

generateAllRGBColors();
pickColor();
renderScore();