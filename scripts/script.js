// import { data } from "./data";

function guessgenerator(){
  let computerMove;
  let rando = Math.random();
  if(rando >= 0 &&rando<1/3){
    computerMove = "rock";
  }else if(rando >=1/3 && rando<2/3){
    computerMove = "paper";
  } else if(rando >=2/3 && rando<1){
    computerMove = "scissors"
  }

  return computerMove;
};

let stats = JSON.parse(localStorage.getItem('stat')) || {
  tg: 0,
  wins: 0,
  losses: 0,
  ties: 0
};


updatestats();


function winner(playmove){
  let res;
   let computerMove = guessgenerator();
   if(computerMove === playmove){
    res =  "Tie";
  };
   if(playmove === "rock"){
       if(computerMove === "scissors"){
        res = "You Win";
       }else if(computerMove === "paper"){
        res = "You Lose";
       }
   }else if(playmove === "scissors"){
    if(computerMove === "rock"){
      res = "You Lose";
    }else if(computerMove === "paper"){
      res = "You Win";
    }
   }else if(playmove === "paper"){
    if(computerMove === "rock"){
      res = "You Win";
    }else if(computerMove === "scissors"){
       res = "You Lose";
      }
   }
stats.tg+=1;
   document.querySelector('.result').innerHTML=
    `<p class="res"
    >You Picked <span>${playmove}</span>-Computer Move is <span>${computerMove}</span></p>
    <p class="res2">The result is: <span>${res}</span></p>
    `;

if(res === "You Win"){
    stats.wins++;
}else if(res === "You Lose"){
  stats.losses++;
}else {
  stats.ties++;
};
 

localStorage.setItem('stat',JSON.stringify(stats));

updatestats();


document.querySelector('.Icon').innerHTML = 
`
<div>
Your Move:
<img src="icons/${playmove}.png">
</div>
 <div>
<img src="icons/${computerMove}.png">
:Computer Move
</div>
`
}

document.querySelector('.rock').addEventListener('click',() => {
  winner('rock');
});

document.querySelector('.paper').addEventListener('click',() => {
  winner('paper');
});

document.querySelector('.scissors').addEventListener('click',() => {
  winner('scissors');
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    winner('rock');
  }else if(event.key === 'p'){
    winner('paper');
  }else if(event.key === 's'){
    winner('scissors');
  }
});


function updatestats() {
  document.querySelector('.stats').innerHTML =
  `
  <p>Total Games: ${stats.tg}</p>
  <p> No.of Wins: ${stats.wins}</p>
  <p>No.of Losses: ${stats.losses}</p>
  <p>No.of Ties: ${stats.ties}</p>
  `
}



function reset(){
  stats.wins = 0;
  stats.losses = 0;
  stats.tg = 0;
  stats.ties = 0
  updatestats();
};


document.querySelector('.reset').addEventListener('click',() => {
  reset();
});
 

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = guessgenerator();
      winner(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.auto').addEventListener('click',() => {
  autoPlay();
})

