const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")

    },

    values: {
        
        gameVelocity: 100,
        hitPosition: 0,
        result: 0,
        currentTme: 60,
    },

    actions: {
        timerId: setInterval(randomSquare, 250),
        countDownTimerId: setInterval(countDown, 1000),
      },
}

function countDown(){
    state.values.currentTme--;
    state.view.timeLeft.textContent = state.values.currentTme;

    if(state.values.currentTme <= 0 ){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over " + state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio("./src/sounds/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}


function randomSquare(){

    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
        
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitbox(){
    //Alguem que fica "ouvindo" alguma ação

    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", ()=>{ 

            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }

        })
    });
}

function init(){
    

    addListenerHitbox()

}

init();

/**
 * state.view()
 * state.value()
 */

