const counterElement = document.querySelector("#counter");
let counter = 0;
let timerID;

const btnStart = document.querySelector("#start");
btnStart.onclick = function () {
  timerID = setInterval(function () {
    counter++;
    counterElement.innerText = counter;
  }, 1000);
};

const btnPause = document.querySelector("#pause");
btnPause.onclick = function () {
  clearInterval(timerID);
};

const btnReset = document.querySelector("#reset");
btnReset.onclick = function () {
  counter = 0;
  counterElement.innerText = counter;
  clearInterval(timerID);
};
