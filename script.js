let diffs = document.querySelector("select");
let firstPick = null;
let secondPick = null;
let leftToReveal = null;
let odd = false;
let lockBoard = false;


//setting defaults
let currentDiff = "Normal";
let diffHead = document.querySelector("h1 > .diff");
diffHead.textContent = currentDiff;


//difficulty change options
diffs.addEventListener("change", (e) => {
  currentDiff = e.target.value;
  diffHead.textContent = currentDiff;
});

const play = document.querySelector(".play");
const h1 = document.querySelector("h1");
const preGame = document.querySelector(".pre-game");


// Game Start
play.addEventListener("click",()=>{
    h1.classList.add("hidden");
    preGame.classList.add("hidden");
    if (currentDiff == "Easy")
    makeGrid(4);
    else if (currentDiff == "Hard")
    makeGrid(6);
    else
    makeGrid(5);
     
})


//.......Game Menu Logic Ends Here.......

const body = document.querySelector("body");


function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
  }
  return arr;
}

function makeGrid(size){
        if(size%2==1){
            odd= true;
        }

        let arrSize = size * size / 2;
        let arr = [];
       
        for(let j = 1; j<=arrSize; j++){

            arr.push(j);
            arr.push(j);
        }

        arr = shuffleArray(arr); // array to assign values randomly in pairs


    leftToReveal = size*size/2; // needed score
    if(odd){
        leftToReveal--;
    }

    body.style.display = "grid";
    let Container = document.createElement("div");
    Container.style.display = "grid";
    Container.style.width = "80vw";
    Container.style.height = "80vh";
    Container.style.gridTemplate = `repeat( ${size}, 1fr ) / repeat( ${size}, 1fr)`;
    Container.style.gap = "2vw";
    body.appendChild(Container);

        let SIZE = size*size;
        if(odd){
            SIZE--;
        }

    for (let i = 0 ; i<SIZE; i++){

       let item = document.createElement("div");
    //    item.textContent = i+"";          also debuggin
        item.style.border = "2px solid black"; //debugging
        item.style.perspective = "1000px";
        item.classList.add("ITEM");
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.justifyContent = "center";
        item.style.overflow = "hidden"; // optional but useful
        item.value = arr[i];
        let ind = arr[i];
   //     item.textContent = arr[i];    debugging


        // click reveals it





item.addEventListener("click", (e) => {
  if (lockBoard) return;        // protect from spammerzzz    
  if (item.classList.contains("REVEAL")) return; // on double-click return
  
  
  item.classList.add("REVEAL");

  if (!firstPick) {
    firstPick = item;
  } else if (!secondPick && item !== firstPick) {
    secondPick = item;
    lockBoard = true;       // we lock in so u lock out

    // Now compare both
    if (firstPick.value === secondPick.value) {
      leftToReveal--;
      firstPick = null;
      secondPick = null;
      lockBoard = false; // ok good one u found it 

      if (leftToReveal === 0) {
      alert("YOU WON!...");     //win condition
      }


    } else {
      // mismatch — hide after delay for easier gameplay
      setTimeout(() => {
        firstPick.classList.remove("REVEAL");
        secondPick.classList.remove("REVEAL");
        firstPick = null;
        secondPick = null;
        lockBoard = false; // try now they are hidden
      }, 1000);
    }
  }
});



        // item appends here

       Container.appendChild(item);

        let card = document.createElement("div");

        card.style.width = "100%";
        card.style.height = "100%";
      //  card.style.border = "2px solid blue"; debuggin
        card.style.transition = "transform 0.6s";   // actual card parameters
        card.style.transformStyle = "preserve-3d";
        card.style.position="relative";
        card.classList.add("CARD");

        let cardFront = document.createElement("div");
        let cardBack = document.createElement("div");


        cardFront.style.position = "absolute";
        cardFront.style.width = "100%";             // card front and back
        cardFront.style.height = "100%";
        cardFront.style.backfaceVisibility = "hidden";


        let img = document.createElement("img");            //image addition
        img.src = `./logo/${ind}.png`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";  // or "cover"


        cardBack.appendChild(img);

        cardBack.style.position = "absolute";
        cardBack.style.width = "100%";
        cardBack.style.height = "100%";
        cardBack.style.backfaceVisibility = "hidden";
        cardBack.style.transform = "rotateY(180deg)";
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        item.appendChild(card);

    }

}




