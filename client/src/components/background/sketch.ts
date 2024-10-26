import p5 from "p5";
import Block from "./block"; 

const sketch = (p: p5) => {
  // let mouseDist = 15;
  let size = 20;
  // let offset = 4;
  let cols: number;
  let rows: number;
  let blocks: Block[][] = [];
  let message = "AI";
  let font: p5.Font;
  let textX: number;
  let textY: number;
  let fontSize = 600;
  let isAnimMessage = false;
  let points: p5.Vector[] = [];

  p.preload = () => {
    if (isAnimMessage) {
      font = p.loadFont("fonts/IstokWeb-Regular.ttf");
    }
  };

  p.setup = () => {
    p.createCanvas(1200, 600);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);

    cols = p.width / size;
    rows = p.height / size;

    if (isAnimMessage) {
      textX = p.width / 2;
      textY = p.height / 2;

      points = font.textToPoints(message, textX, textY, fontSize) as p5.Vector[];
      let bounds = font.textBounds(message, 0, 0, fontSize) as { x: number; y: number; w: number; h: number };
      let xOffset = bounds.x + bounds.w / 2;
      let yOffset = bounds.y + bounds.h / 2;

      for (let p of points) {
        p.x -= xOffset;
        p.y -= yOffset;
      }
    }

    let xStart = size / 2;
    let yStart = size / 2;

    for (let i = 0; i < cols; i++) {
      blocks[i] = [];
      let x = xStart + i * size;
      for (let j = 0; j < rows; j++) {
        let y = yStart + j * size;
        blocks[i][j] = new Block(p, x, y);
      }
    }
  };

  p.draw = () => {
    p.background(12);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (isAnimMessage) {
          for (let pnt of points) {
            let dx = pnt.x - blocks[i][j].x;
            let dy = pnt.y - blocks[i][j].y;
            let distanceSq = dx * dx + dy * dy;
            if (distanceSq < 100) {
              blocks[i][j].isText = true;
              break;
            }
          }
        }
        blocks[i][j].move();
        blocks[i][j].display();
      }
    }
  };
};

export default sketch;
