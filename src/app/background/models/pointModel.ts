import { Vector } from "./vectorModel";

export class Point{
  x: number = 0;
  y: number = 0;
  vector: Vector = new Vector();
  speed: number = 0;
  constructor(centrX: number, centrY: number, r = 75){
    this.vector.rand();
    this.speed = Math.floor(Math.random()) * 10;
    this.y = centrY + Math.floor(Math.random() * (r + r) ) - r;
    this.x = centrX + Math.floor(Math.random() * (r + r) ) - r;
  }
}
