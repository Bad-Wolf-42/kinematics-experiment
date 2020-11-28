const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

let segmentsArray = [];
let maxSegments = 50;

class Segment {
  constructor(index) {
    this.index = index;
    this.ax = (this.index === 0) ? canvas.width/2 : segmentsArray[index - 1].bx;
    this.ay = (this.index === 0) ? canvas.height : segmentsArray[index - 1].by;
    this.theta = 0;
    this.length = 10;
    this.dx = Math.cos(this.theta) * this.length;
    this.dy = Math.sin(this.theta) * this.length;
    this.bx = this.ax + this.dx;
    this.by = this.ay + this.dy;
  }
  draw() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.bx, this.by);
    ctx.closePath();
    ctx.stroke();
  }
  update() {
    this.ax = (this.index === 0) ? canvas.width/2 : segmentsArray[this.index - 1].bx;
    this.ay = (this.index === 0) ? canvas.height : segmentsArray[this.index - 1].by;
    if (this.index !== 0) this.theta = segmentsArray[this.index - 1].theta - 0.5;
    else if (this.index === 0) this.theta += 0.05;
    this.dx = Math.cos(this.theta) * this.length;
    this.dy = -Math.abs(Math.sin(this.theta) * this.length);
    this.bx = this.ax + this.dx;
    this.by = this.ay + this.dy;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < segmentsArray.length; i++) {
    segmentsArray[i].update();
    segmentsArray[i].draw();
  }
  requestAnimationFrame(animate);
}

function init() {
  for (i = 0; i < maxSegments; i++) {
    segmentsArray.push(new Segment(i));
  }
  animate();
}

init();
