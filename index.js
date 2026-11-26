let stat = "start";
let startTime;
let BestScore = Number(localStorage.getItem("BestScore")) || Infinity;
document.getElementById("bestTime").innerText = `${BestScore} ms`;

function game() {
    let delay = ran_time();
    if (stat === "start"){
        document.getElementById("btn").innerText = "WAIT";
        stat = "waiting";
        timer = setTimeout(() => {

            const btn = document.getElementById("btn");

            if (document.body.classList.contains("sk-yellow")) {
                btn.style.backgroundColor = "#ffcc36";
                btn.style.color = "#151a20";
            }

            else if (document.body.classList.contains("sk-purple")) {
                btn.style.backgroundColor = "#a879e8";
                btn.style.color = "#151a20";
            }

            document.getElementById("btn").innerText = "ACT!";
            startTime = performance.now();
            stat = "playing";
        }, delay);
    }

    else if (stat === "waiting"){
        stat = "cooldown";
        document.getElementById("btn").innerText = "Too Early!";
        setTimeout(() => {
            stat = "start";
            document.getElementById("btn").innerText = "START";
        }, 1600);

        clearTimeout(timer);
    }
    else if (stat === "playing"){
        document.getElementById("btn").innerText = "Well Done";
        let reactionTime = performance.now() - startTime;
        document.getElementById("Time").innerText = `${reactionTime} ms`;
        stat = "cooldown";
        setTimeout(() => {
            stat = "start";
            document.getElementById("btn").innerText = "START";
            document.getElementById("btn").style.backgroundColor = "";
            document.getElementById("btn").style.color = "";
        }, 1000);

        if (reactionTime < BestScore || BestScore === Infinity) {
            BestScore = reactionTime;
            localStorage.setItem("BestScore", BestScore);
            document.getElementById("bestTime").innerText = `${BestScore} ms`;
        }
        }
}

function ran_time(){
    return  Math.random() * (12000 - 800) + 800;
}
