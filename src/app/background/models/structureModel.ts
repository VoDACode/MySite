import { Point } from "./pointModel";
import { Vector } from "./vectorModel";

export class Structure {
  public points: Point[] = [];
  public vector: Vector = new Vector();
  public speed: number = 0;
  public radius: number = 0;
  public pointLinit = 0;
  public centerX = 0;
  public centerY = 0;
  constructor(poinLinit: number, radius: number, centerX: number, centerY: number) {
    this.vector.rand();
    this.pointLinit = poinLinit;
    this.speed = Math.floor(Math.random() * (1 - 0.8)) + 0.8;
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
    for (let i = 0; i < poinLinit; i++) {
      this.points.push(new Point(this.radius));
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x + this.centerX, this.points[0].y + this.centerY);
    for (let i = 0; i < this.points.length; i++) {
      ctx?.fillRect(this.points[i].x + this.centerX, this.points[i].y + this.centerY, 5, 5);
      ctx.lineTo(this.points[i].x + this.centerX, this.points[i].y + this.centerY);
    }
    ctx.lineTo(this.points[0].x + this.centerX, this.points[0].y + this.centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx?.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  public tick() {
    this.step();
    this.normalization();
    this.centrGravitation();
  }

  public step(): void {
    this.centerX += this.vector.x * this.speed;
    this.centerY += this.vector.y * this.speed;
  }

  public stepBack(): void {
    this.centerX -= this.vector.x * this.speed;
    this.centerY -= this.vector.y * this.speed;
  }

  public normalization(): void {
    if (this.centerX <= this.radius || this.centerX >= window.innerWidth - this.radius) {
      this.vector.x *= -1;
    }
    if (this.centerY <= this.radius || this.centerY >= window.innerHeight - this.radius) {
      this.vector.y *= -1;
    }
  }

  public getSpeed(): number {
    let speed = 0;
    for (let i = 0; i < this.points.length; i++) {
      speed += this.points[i].speed;
    }
    speed /= this.points.length;
    return speed;
  }

  public getVector(): Vector {
    let v = new Vector();
    for (let i = 0; i < this.points.length; i++) {
      v.x += this.points[i].vector.x;
      v.y += this.points[i].vector.y;
    }
    v.x = v.x / this.points.length;
    v.y = v.y / this.points.length;
    return v;
  }

  public getPos(): { x: number, y: number } {
    let res = { x: 0, y: 0 };
    for (let i = 0; i < this.points.length; i++) {
      res.x += this.points[i].x;
      res.y += this.points[i].y;
    }
    res.x /= this.points.length;
    res.y /= this.points.length;
    return res;
  }

  private centrGravitation() {
    for (let i = 0; i < this.points.length; i++) {
      let len = this.calculateLen(this.points[i].x + this.centerX, this.points[i].y + this.centerY, this.centerX, this.centerY);
      if (len > this.radius) {
        this.points[i].vector = this.points[i].vector.multiply(-1);
      }
      this.points[i].step();
    }
  }

  private calculateLen(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}
