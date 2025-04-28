const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const eraserButton = document.querySelector("#eraser");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let isErasing = false;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = isErasing ? "rgba(0,0,0,1)" : `hsl(${hue}, 100%, 50%)`;
  ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (!isErasing) {
    hue++;
    if (hue >= 360) {
      hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

eraserButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraserButton.textContent = isErasing ? "Switch to Draw" : "Switch to Erase";
});
