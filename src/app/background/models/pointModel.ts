import { Vector } from "./vectorModel";

export class Point {
  x: number = 0;
  y: number = 0;
  vector: Vector = new Vector();
  speed: number = 0;
  constructor(r: number) {
    this.vector.rand();
    this.speed = Math.floor(Math.random() * (6 - 5)) + 5;
    this.speed = 2;
    this.y = Math.floor(Math.random() * (r / 2 - r / 4 + 1)) + r / 4;
    this.x = Math.floor(Math.random() * (r / 2 - r / 4 + 1)) + r / 4;
  }

  public step(): void {
    this.x += this.speed * this.vector.x;
    this.y += this.speed * this.vector.y;
  }
}
