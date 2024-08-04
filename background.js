let directionValue = 0;

let head = document.getElementById("sHead");
let target = document.querySelector(".target");
let score = document.querySelector(".score");
let result = document.querySelector(".result");
let targetRow, targetCol;

let upButton = document.querySelector(".up");
let leftButton = document.querySelector(".left");
let rightButton = document.querySelector(".right");
let downButton = document.querySelector(".down");
/*
    0 : "right",
    1 : "down",
    2 : "left",
    3 : "up",
*/

// let bgSound = document.getElementById("backgroundMusic");
// bgSound.play();

function snakeMotion() {
    let headStyles = window.getComputedStyle(head);
    switch (directionValue) {
        case 0: head.style.gridRow = Number(headStyles['gridRow']);
            head.style.gridColumn = Number(headStyles['gridColumn']) + 1;
            if (head.style.gridColumn > 50) {
                setTimeout(() => {
                    clearInterval(snakeMotionInterval);
                    result.style.display = 'flex';
                    gameover();
                    document.querySelector(".result_score").innerHTML = score.innerHTML;
                }, 150);
            }
            head.style.rotate = "0deg";
            break;
        case 1: head.style.gridRow = Number(headStyles['gridRow']) + 1;
            head.style.gridColumn = Number(headStyles['gridColumn']);
            head.style.rotate = '90deg';
            if (head.style.gridRow > 50) {
                setTimeout(() => {
                    clearInterval(snakeMotionInterval);
                    result.style.display = 'flex';
                    gameover();
                    document.querySelector(".result_score").innerHTML = score.innerHTML;
                }, 150);
            }
            break;
        case 2: head.style.gridRow = Number(headStyles['gridRow']);
            head.style.gridColumn = Number(headStyles['gridColumn']) - 1;
            head.style.rotate = '180deg';
            if (head.style.gridColumn < 1) {
                setTimeout(() => {
                    clearInterval(snakeMotionInterval);
                    result.style.display = 'flex';
                    gameover();
                    document.querySelector(".result_score").innerHTML = score.innerHTML;
                }, 150);
            }
            break;
        case 3: head.style.gridRow = Number(headStyles['gridRow']) - 1;
            head.style.gridColumn = Number(headStyles['gridColumn']);
            head.style.rotate = '270deg';
            if (head.style.gridRow < 1) {
                setTimeout(() => {
                    clearInterval(snakeMotionInterval);
                    result.style.display = 'flex';
                    gameover();
                    document.querySelector(".result_score").innerHTML = score.innerHTML;
                }, 150);
            }
            break;
        default: break
    }

    let snake = document.querySelectorAll(".snake");

    if (head.style.gridRow == targetRow && head.style.gridColumn == targetCol) {
        score.innerHTML = Number(score.innerHTML) + 1;
        let newelement = document.createElement('div');
        newelement.classList = "sBody snake";
        snake[0].insertAdjacentElement('beforebegin', newelement)
        targetPosition();
    }
    snake = document.querySelectorAll(".snake");
    let currRow, currCol, parRow = head.style.gridRow, parCol = head.style.gridColumn;

    for (let s = snake.length - 1; s >= 0; s--) {
        currRow = window.getComputedStyle(snake[s])['gridRow'];
        currCol = window.getComputedStyle(snake[s])['gridColumn'];

        snake[s].style.gridRow = parRow;
        snake[s].style.gridColumn = parCol;

        parRow = currRow;
        parCol = currCol;
    }

    for(let index = snake.length-3;index>=0;index--){
        
        // if(snake[index] !== head){
            if((head.style.gridRow == snake[index].style.gridRow) && (head.style.gridColumn == snake[index].style.gridColumn)){
                setTimeout(() => {
                    clearInterval(snakeMotionInterval);
                    result.style.display = 'flex';
                    document.querySelector(".result_score").innerHTML = score.innerHTML;
                }, 150);
            }
        // }
    }
}

function gameover() {
    console.log("OUT")
    // bgSound.pause()
    // let overSound = new Audio("Game Over Snake.wav");
    // overSound.play();
}

function directionController(key) {
    if ("ArrowRight" == key.code && directionValue != 2) {
        directionValue = 0;
    }
    if ("ArrowDown" == key.code && directionValue != 3) {
        directionValue = 1;
    }
    if ("ArrowLeft" == key.code && directionValue != 0) {
        directionValue = 2;
    }
    if ("ArrowUp" == key.code && directionValue != 1) {
        directionValue = 3;
    }
}

function targetPosition() {
    targetRow = target.style.gridRow = 1 + Math.floor(Math.random() * 49);
    targetCol = target.style.gridColumn = 1 + Math.floor(Math.random() * 49);

}

function replay(){
    snakeMotionInterval = setInterval(snakeMotion, 150);
    directionValue = 0;
    score.innerHTML = "0";
    result.style.display = "none";
    let sbody = document.querySelectorAll(".sBody");
    sbody.forEach(element => {
        element.remove();
    });

    let snake = document.querySelectorAll(".snake");
    snake.forEach(element => {
        element.style = "";
    });
    targetPosition();
    // bgSound.play()
}

targetPosition();
score.innerHTML = '0';

let snakeMotionInterval = setInterval(snakeMotion, 150);

document.addEventListener("keydown", directionController);

upButton.addEventListener("click", ()=>{
    if (directionValue != 1) {
        directionValue = 3;
    }
});
leftButton.addEventListener("click", ()=>{
    if (directionValue != 2) {
        directionValue = 0;
    }
});
rightButton.addEventListener("click", ()=>{
    if (directionValue != 0) {
        directionValue = 2;
    }
});
downButton.addEventListener("click", ()=>{
    if (directionValue != 3) {
        directionValue = 1;
    }
});