const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export { canvas };

export function render( shapes) {
  ctx.clearRect(0, 0,canvas.width, canvas.height);

  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;
    if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
      ctx.fill();
    }
    if (shape.type === "square") {
      ctx.fillRect(
        shape.x - shape.size / 2,
        shape.y - shape.size / 2,
        shape.size,
        shape.size
      );
    }

    if (shape.type === "triangle") {
      ctx.beginPath();

      // 1. Move to the Top Point
      ctx.moveTo(shape.x, shape.y - shape.size / 2);

      // 2. Draw line to Bottom-Right Point
      ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);

      // 3. Draw line to Bottom-Left Point
      ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);

      // 4. Close the path back to the Top Point
      ctx.closePath();

      ctx.fill();
    }
  });
}
