let cardArray = [
  {
    id: 1,
    name: "earth",
    img: "/img/earth.svg",
  },
  {
    id: 2,
    name: "jupiter",
    img: "/img/jupiter.svg",
  },
  {
    id: 3,
    name: "mars",
    img: "/img/mars.svg",
  },
  {
    id: 4,
    name: "mercury",
    img: "/img/mercury.svg",
  },
  {
    id: 5,
    name: "saturn",
    img: "/img/saturn.svg",
  },
  {
    id: 6,
    name: "uranus",
    img: "/img/uranus.svg",
  },
  {
    id: 7,
    name: "earth",
    img: "/img/earth.svg",
  },
  {
    id: 8,
    name: "jupiter",
    img: "/img/jupiter.svg",
  },
  {
    id: 9,
    name: "mars",
    img: "/img/mars.svg",
  },
  {
    id: 10,
    name: "mercury",
    img: "/img/mercury.svg",
  },
  {
    id: 11,
    name: "saturn",
    img: "/img/saturn.svg",
  },
  {
    id: 12,
    name: "uranus",
    img: "/img/uranus.svg",
  },
];

const grid = document.querySelector("[data-function='grid']");
const score = document.querySelector("[data-function='score']");
const attempt = document.querySelector("[data-function='attempts']");
const startBtn = document.querySelector(".startBtn");
const second = document.querySelector(".second");
const GameOverText = document.querySelector(".Game-over");
const finalScore = document.querySelector(".finalScore");
const finalAttempts = document.querySelector(".finalAttempts");



let countClick = 0;
let clickedCard = [];
let countFinalGame = [];

let countScore = 0;
let countAttemps = 0;
const imagem = "/img/universe.svg";
const clicked = "/img/tick.svg";

const finalGame = () => {
  if (countScore == 6) {
    modal.style.display = "block";
    GameOverText.innerHTML = "Good Memory"
    finalScore.innerHTML = `Final Score: ${countScore}`
    finalAttempts.innerHTML = `Attempts: ${countAttemps}`

  }
};

const countMatch = () => {
  const img = document.querySelectorAll("img");

  if (countClick === 2) {
    const card1 = cardArray.findIndex(
      (element) => element.id === clickedCard[0].id
    );
    const card2 = cardArray.findIndex(
      (element) => element.id === clickedCard[1].id
    );

    if (clickedCard[0].name === clickedCard[1].name) {
      countScore++;
      finalGame();
      countAttemps++;
      score.innerHTML = countScore;
      attempt.innerHTML = countAttemps;
      setTimeout(() => {
        img[card1].setAttribute("src", clicked);
        img[card2].setAttribute("src", clicked);
      }, 1000);
      countClick = 0;
      clickedCard = [];
    } else {
      countAttemps++;
      attempt.innerHTML = countAttemps;
      img[card1].addEventListener("click", handleValidClick);
      img[card2].addEventListener("click", handleValidClick);
      countClick = 0;
      clickedCard = [];

      setTimeout(() => {
        img[card1].setAttribute("src", imagem);
        img[card2].setAttribute("src", imagem);
      }, 1000);
    }
  }
};

const handleValidClick = (event) => {
  const img = document.querySelectorAll("img");
  const id = event.target.id;
  countClick++;

  let card = cardArray.find((element) => element.id == id);
  let cardIndex = cardArray.findIndex((element) => element.id == id);

  if (!clickedCard.includes(card)) {
    clickedCard.push(card);
    img[cardIndex].setAttribute("src", cardArray[cardIndex].img);
    img[cardIndex].removeEventListener("click", handleValidClick);
    countMatch(countClick);
  }
};

const makeCard = () => {
  grid.innerHTML = ""
  for (const item of cardArray) {
    const card = document.createElement("img");
    card.setAttribute("src", imagem);
    card.setAttribute("id", item.id);
    card.setAttribute("name", item.name);
    grid.appendChild(card);
  }
};
makeCard();

let seconds = 0;
const setTimer = () => {
  second.innerText = seconds <= 9 ? "0" + seconds : seconds;
  seconds = seconds <= 10 ? seconds : 0;
  seconds++;

  const cards = document.querySelectorAll("img");
  for (const card of cards) {
    card.addEventListener("click", handleValidClick);
  }
};

const startGame = () => {
  makeCard();
  countScore = 0
  countAttemps = 0
  seconds = 0;
  score.innerHTML = countScore;
  attempt.innerHTML = countAttemps;
  

  let id = setInterval(() => {
    setTimer();
    if (seconds >= 11) {
      modal.style.display = "block";
      GameOverText.innerHTML = "Game Over"
      finalScore.innerHTML = `Final Score: ${countScore}`
      finalAttempts.innerHTML = `Attempts: ${countAttemps}`
      clearInterval(id);
      seconds = 0;

      const cards = document.querySelectorAll("img");
      for (const card of cards) {
        card.removeEventListener("click", handleValidClick);
      }
    }
  }, 1000);
};

startBtn.addEventListener("click", startGame);

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
  }
};
