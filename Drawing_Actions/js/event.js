export function setupEvents(handlers,canvas) {
  document.getElementById("undo").onclick = handlers.undo;
  document.getElementById("redo").onclick = handlers.redo;
  document.getElementById("circle_btn").onclick = handlers.circle;
  document.getElementById("square_btn").onclick = handlers.square;
  document.getElementById("triangle_btn").onclick = handlers.triangle;

  canvas.addEventListener("click",handlers.canvasClick);
}
 