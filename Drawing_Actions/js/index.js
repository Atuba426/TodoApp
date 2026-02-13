import { initialState, drawShape, undo, redo } from "./state.js";
import { createShape } from "./shapes.js";
import { render, canvas } from "./ui.js";
import { setupEvents } from "./event.js";

let state = initialState;
let selectedShape="circle";

// helpers
function randomX() {
  return Math.random() * canvas.width;
}

function randomY() {
  return Math.random() * canvas.height;
}
function getCanvasPosition(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
function canvasClick(event) {
  const { x, y } = getCanvasPosition(event);

  state = drawShape(
    state,
    createShape(selectedShape, x, y, 25, "yellow")
  );

  render(state.present);
};

// handlers passed to event.js
const handlers = {
  circle() {
    selectedShape = "circle";
   /* state = drawShape(
      state,
      createShape("circle", randomX(), randomY(), 20, "red")
    );
    render(state.present); */
  },

  square() {
    selectedShape = "square";
     /* 
    state = drawShape(
      state,
      createShape("square", randomX(), randomY(), 30, "blue")
    );
    render(state.present); */
  },

  triangle() {
    selectedShape = "triangle";
    /* 
    state = drawShape(
      state,
      createShape("triangle", randomX(), randomY(), 40, "pink")
    );
    render(state.present); */
  },
  canvasClick,

  undo() {
    state = undo(state);
    render(state.present);
  },

  redo() {
    state = redo(state);
    render(state.present);
  }
};

setupEvents(handlers,canvas);
render(state.present);
