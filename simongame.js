let gameSeq = [];
let playerSeq = [];
let p = document.querySelector("p");
let colors = ["red", "green", "yellow", "blue"];
let level = 0;
let started = true;
let levelCount = 0;
let nextReset = 0;
let gameContainer = document.querySelector(".btn-container");
let h1 = document.querySelector("h1");
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", function () {
    document.querySelector(".startText").style.opacity = "0";
    gameContainer.style.top = "0";
    p.style.opacity = "1";
    if(window.innerWidth < 768) {
        document.querySelector(".gameStart").style.opacity = "1";
        p.innerText = "";
    }
    let headingColor = ["red","lime","blue","cornflowerblue","orange","purple","magenta","palegreen","powderblue","forestgreen","lavender","steelblue"];
    let randIdx = Math.floor(Math.random() * 12);
    let Color = headingColor[randIdx];
    h1.style.color = `${Color}`;
});
document.querySelector(".gameStart").addEventListener("click", function () {
    document.querySelector(".gameStart").style.opacity = "0";
    if (started) {
        started = false;
        levelUp();
    }
});

document.querySelector(".restartBtn").addEventListener("click", function () {
    if (started) {
        started = false;
        levelUp();
    }
    document.querySelector(".restartBtn").style.opacity = "0";
});

//document.addEventListener("touchstart", function () {    
    //if (started) {
       // started = false;       
        //levelUp();
  // }
// });

document.addEventListener("keypress", function () {
    if (started) {
        started = false;
        levelUp();
    }
});

function levelUp() {
    level++;
    levelCount++;
    p.innerText = `Level: ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function btnPress() {
    btnFlash(this);
    let userColor = this.getAttribute("id");
    playerSeq.push(userColor);
    let idx = playerSeq.length - 1;
    checkAns(idx);
}

function checkAns(idx) {
    if(playerSeq[idx] === gameSeq[idx]) {
        if(playerSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
            playerSeq = [];
        }
    } else {
        if(window.innerWidth < 768) {
            document.querySelector(".restartBtn").style.opacity = "1";
            p.innerHTML = `Game Over! &nbsp;Your Score was: <b>${level-1}`;
        }
        if(window.innerWidth > 768) {
            p.innerHTML = `Game Over! &nbsp;Your Score was: <b>${level-1}</b> <br> Press any key to Start`;
        }
        reset();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },250);
    }
}

function reset() {
    started = true;
    gameSeq = [];
    playerSeq = [];
    level = 0;
}


