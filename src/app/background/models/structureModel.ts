import { Point } from "./pointModel";
import { Vector } from "./vectorModel";

export class Structure{
  public points: Point[] = [];
  public pointLinit = 0;
  public centerX = 0;
  public centerY = 0;
  constructor(poinLinit: number){
    this.pointLinit = poinLinit;
    this.centerY = Math.floor(Math.random() * (window.innerHeight - 5) ) + 5;
    this.centerX = Math.floor(Math.random() * (window.innerWidth - 5) ) + 5;
    for(let i = 0; i < poinLinit; i++){
      this.points.push(new Point(this.centerX, this.centerY));
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void{
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for(let i = 0; i < this.points.length; i++){
      ctx?.fillRect(this.points[i].x, this.points[i].y, 5, 5);
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.stroke();
  }

  public tick(){
    let randomItems = new Array(Math.floor(Math.random()*this.pointLinit-1));

    for(let i = 0; i < randomItems.length; i++){
      let item = this.points[Math.floor(Math.random()*this.points.length)];
      if(!randomItems.find(p => p == item)){
        i--;
        continue;
      }
      randomItems.push(item);
    }

  }

  public getVector(): Vector{
    let v = new Vector();
    for(let i = 0; i < this.points.length; i++){
      v.x += this.points[i].vector.x;
      v.y += this.points[i].vector.y;
    }
    v.x = v.x / this.points.length;
    v.y = v.y / this.points.length;
    return v;
  }
}
