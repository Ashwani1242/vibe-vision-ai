import p5 from "p5";

class Block {
  private p: p5;
  x: number;
  y: number;
  angle: number;
  colour: number;
  isText: boolean;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.colour = 70;
    this.isText = false;
  }

  display() {
    this.p.noFill();
    this.p.stroke(this.isText ? 255 : this.colour - 30, this.colour - 50, this.colour - 20);
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.angle);

    if (this.angle >= 0 && this.angle < 30) {
      this.drawPlus();
    } else {
      this.drawRect();
    }

    this.p.pop();
  }

  move() {
    let dx = this.p.mouseX - this.x;
    let dy = this.p.mouseY - this.y;
    let distanceSq = dx * dx + dy * dy;

    if (distanceSq < 40 * 40) {
      this.angle++;
      this.colour = 255;
    }

    if (this.angle > 0 && this.angle < 90) {
      this.angle++;
      if (this.colour > 70) {
        this.colour -= 3;
      }
    } else {
      this.angle = 0;
      this.colour = 70;
    }
  }

  drawRect() {
    this.p.rect(0, 0, 10 - 4, 10 - 4);
  }

  drawPlus() {
    let margin = -10 / 2;
    this.p.line(
      margin + 4 / 2,
      margin + 4 / 2,
      margin + 10 - 4 / 2,
      margin + 10 - 4 / 2
    );
    this.p.line(
      margin + 10 - 4 / 2,
      margin + 4 / 2,
      margin + 4 / 2,
      margin + 10 - 4 / 2
    );
  }
}

export default Block;
