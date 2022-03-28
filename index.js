let canvas = document.getElementById("xlCanvas");
let smallCanvas = document.getElementById("smCanvas");
let ctx = canvas.getContext("2d");

canvas.addEventListener("click", function (e) {
  let pos = findPos(this);
  let x = e.pageX - pos.x;
  let y = e.pageY - pos.y;
  let objectColor = this.getContext("2d").getImageData(x, y, 1, 1).data;
  let hex = convertToHex(objectColor[0], objectColor[1], objectColor[2])
  for (let item in objectColor) {
    if (objectColor[item]) {
      smallCanvas.style.background = hex;
    } else {
      smallCanvas.style.background = "#fff";
    }
  }
});

function findPos(obj) {
  let curleft = 0;
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return { x: curleft, y: curtop };
  }
  return undefined;
}

function convertToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function drawStar(cx, cy, corners, outerRadius, innerRadius, color) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / corners;

  ctx.beginPath();
  for (let i = 0; i < corners; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
}

drawStar(50, 100, 5, 30, 15, "#ff0000");
drawStar(150, 100, 5, 30, 15, "#0000ff");
drawStar(250, 100, 5, 30, 15, "#008000");
drawStar(350, 100, 5, 30, 15, "#ffff00");
drawStar(450, 100, 5, 30, 15, "#000000");