let gd = {
  cards: [
    { front: "images/que_icon.svg", back: "images/img-1.png" },
    { front: "images/que_icon.svg", back: "images/img-2.png" },
    { front: "images/que_icon.svg", back: "images/img-3.png" },
    { front: "images/que_icon.svg", back: "images/img-4.png" },
    { front: "images/que_icon.svg", back: "images/img-5.png" },
    { front: "images/que_icon.svg", back: "images/img-6.png" },
  ],
  timeLimit: 60,
};
let st = {
  fCards: [],
  mPairs: 0,
  flips: 0,
  timeLeft: gd.timeLimit,
  timer: null,
  isPlay: false,
};
function init() {
  st = {
    fCards: [],
    mPairs: 0,
    flips: 0,
    timeLeft: gd.timeLimit,
    timer: null,
    isPlay: false,
  };
  document.querySelector(".time b").textContent = st.timeLeft;
  document.querySelector(".flips b").textContent = st.flips;
  let gBoard = document.getElementById("gameBoard");
  gBoard.innerHTML = "";
  [...gd.cards, ...gd.cards]
    .sort(() => Math.random() - 0.5)
    .forEach((card, i) => {
      const el = document.createElement("div");
      el.className = "card";
      el.dataset.i = i;
      el.innerHTML = `<div class="view front-view"><img src="${card.front}" alt="card"></div><div class="view back-view"><img src="${card.back}" alt="card"></div>`;
      el.addEventListener("click", () => flip(el, i));
      gBoard.appendChild(el);
    });
}
function flip(el, i) {
  if (st.fCards.length >= 2 || el.classList.contains("flip")) return;
  if (!st.isPlay) {
    st.isPlay = true;
    st.timer = setInterval(() => {
      st.timeLeft--;
      document.querySelector(".time b").textContent = st.timeLeft;
      if (st.timeLeft <= 0) end(false);
    }, 1000);
  }
  el.classList.add("flip");
  st.fCards.push({ el, i });
  st.flips++;
  document.querySelector(".flips b").textContent = st.flips;
  if (st.fCards.length === 2) checkMatch();
}
function checkMatch() {
  let [f, s] = st.fCards;
  let match =
    f.el.querySelector(".back-view img").src ===
    s.el.querySelector(".back-view img").src;
  if (match) {
    st.mPairs++;
    if (st.mPairs === gd.cards.length) end(true);
    st.fCards = [];
  } else {
    setTimeout(() => {
      f.el.classList.remove("flip");
      s.el.classList.remove("flip");
      st.fCards = [];
    }, 1000);
  }
}
function end(isWin) {
  clearInterval(st.timer);
  let msg = isWin
    ? `You won with ${st.flips} flips!`
    : "Time's up! Try again.";
  document.getElementById("message").textContent = msg;
  document.getElementById("popup").style.display = "flex";
}
document.getElementById("restart").addEventListener("click", init);
document.getElementById("popupButton").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
  init();
});
init();
