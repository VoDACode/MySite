export class Vector{
  y: number = 0;
  x: number = 0;
  rand(): void{
    this.x = (Math.random() > 0.5 ? 1 : -1) * Math.random();
    this.y = (Math.random() > 0.5 ? 1 : -1) * Math.random();
  }
}
