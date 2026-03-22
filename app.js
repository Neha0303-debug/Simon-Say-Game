let userSeq = [];
let gameSeq = [];

let start = false;
let level=0;
let highScore = localStorage.getItem("highScore" || 0);
highScore = Number(highScore);
let colors = ["green", "red", "orange", "info"];

let play = document.querySelector(".play");
let h2 = document.querySelector("h2");

function btnFlash(randBtn) {
    randBtn.classList.add("blink");
    setTimeout(() => {
        randBtn.classList.remove("blink");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;
    let idx = Math.floor(Math.random()*4);
    randColor = colors[idx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

let allBtns = document.querySelectorAll(".Btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function checkAns(idx) {
    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length) {
            levelUp();
        }
    }else {
        if(level>highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore);
        }
        h2.innerHTML = `Game overed ! Your score is ${level} 
        <br> Your highest score is ${highScore} Play again`;
        reset();
    }
}

function reset() {
    start = false;
    level=0;
    userSeq = [];
    gameSeq = [];
}
function btnPress() {
    if(start==true) {
        let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
    }
    
}
play.addEventListener("click", () => {
    if(start==false) {
        levelUp();
        start = true;
    }

})
