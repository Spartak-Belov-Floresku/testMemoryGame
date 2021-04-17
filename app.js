const spans = document.querySelectorAll("h1>span");
const gameContainer = document.getElementById("game");
let game = document.querySelector("#startGame");
let panel1 = document.querySelector("#panel1");
let panel2 = document.querySelector("#panel2");
game.addEventListener("click", startGame);

for(let i = 0; i < spans.length; i++){
  spans[i].setAttribute("style", `animation-delay: ${1 + (i+1)/10}s`)
}

function startGame(){
  let num = parseInt(document.querySelector('#numcolor').value);
    if(!num >= 1){return;}
      generatorColors(num);
      createDivsForColors(shuffle(COLORS));
      if(panel1.classList.contains("blockAnimation")){
        panel1.classList.toggle("blockAnimation");
      }
        panel1.classList.toggle("hidePanel1");
        panel2.classList.toggle("hidePanel2");
          let button = document.createElement("button");
          let back = document.createElement("button");
            back.setAttribute('id','back');
            button.setAttribute('id','restartgame');
          button.classList.toggle("restartgame");
        button.addEventListener('click',restartGame);
        back.addEventListener('click',backHome);
      button.innerText = "Restart Game";
      back.innerText = "Back to colors";
    panel2.append(button);
    panel2.append(back);
}

const COLORS = [];
function generatorColors(val){
  let first = [];
  let second = [];
  for(let i = 0; i < val; i++ ){
    var color = '#'+Math.random().toString(16).slice(-3);
      first.push(color);
        second.push(color);
  }
  COLORS.length = 0;
    COLORS.push(...first, ...second);
}

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  let bs = document.querySelector("#bestScore");

  if(!localStorage.getItem(COLORS.length)){
    localStorage.setItem(COLORS.length, 0);
    bs.innerText = `is waiting your scour for ${COLORS.length/2} colors!`;
  }else{
    if(parseInt(localStorage.getItem(COLORS.length)) != 0 ){
      bs.innerText = `is ${localStorage.getItem(COLORS.length)} for ${COLORS.length/2} colors`;
    }else{
      bs.innerText = `is waiting your scour for ${COLORS.length/2} colors!`;
    }
  }

  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(e) {

  let i = 0;
  let tagDiv;
  var color = e.target.getAttribute("class");

  let divs = document.querySelectorAll('#game div');
  divs.forEach(div => {
    if( div.classList.contains("top-head")){
      tagDiv = div;
        i++;
    }
  });
  if(i===2){
    return;
  }else if(i===1){
    e.target.style.background = color;
    if(tagDiv.style.background === e.target.style.background  && e.target !== tagDiv){
      countScoure();
      tagDiv.classList.remove("top-head");
        tagDiv.classList.add("match");
          e.target.classList.add("match");
            matchDivs = document.querySelectorAll('.match');
              if(matchDivs.length == COLORS.length){
                let sc = parseInt(localStorage.getItem(COLORS.length));
                if(sc > getCurrentScore() || sc == 0){
                  localStorage.setItem(COLORS.length, getCurrentScore());
                    bs = document.querySelector("#bestScore");
                    bs.innerText = `is ${getCurrentScore()} for ${COLORS.length/2} colors`;
                }
                let bt = document.querySelector('#restartgame');
                  bt.classList.toggle("restartgame");
              }
      return;
    }else{
      countScoure();
      if(tagDiv !== e.target){
        setTimeout(removeTopHead, 1000);
      }
    }
  }
  if(!e.target.classList.contains("match")){
    e.target.style.background = color;
      e.target.classList.add("top-head");
  }

}

function countScoure(){
  let span = document.querySelector("#currentScore");
    let score = parseInt(span.innerText)+1
      span.innerText = score;
}

function getCurrentScore(){
  let span = document.querySelector("#currentScore");
  return parseInt(span.innerText);
}

function removeTopHead(){
  let divs = document.querySelectorAll('#game div');
  divs.forEach(div => {
    if( div.classList.contains("top-head") && !div.classList.contains("match")){
      div.classList.remove("top-head");
        div.removeAttribute("style");
    }
  });
}






function restartGame(){
  let divs = document.querySelectorAll('#game div');
  let i = 0;
  divs.forEach(div => {
    if(div.classList.contains("match")){
      i++;
    }
  });
  if(i !== divs.length){
    return;
  }
  document.querySelector('#restartgame').classList.toggle("restartgame");
  let num = parseInt(document.querySelector('#numcolor').value);
    if(!num >= 1){return;}
      divs.forEach(div => {div.remove();});
        document.querySelector("#currentScore").innerText = 0;
          generatorColors(num);
            createDivsForColors(shuffle(COLORS));
}


function backHome(){
  document.querySelector("#currentScore").innerText = 0;
  panel1.classList.toggle("hidePanel1");
  panel1.classList.toggle("blockAnimation");
  panel2.classList.toggle("hidePanel2");
    divs = document.querySelectorAll("#game>div");
    divs.forEach(div => {div.remove();});
      document.querySelector("#back").remove();
      document.querySelector("#restartgame").remove();
}