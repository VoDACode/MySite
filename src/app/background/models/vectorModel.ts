export class Vector {
  y: number = 0;
  x: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  rand(): void {
    this.x = (Math.random() > 0.5 ? 1 : -1) * Math.random();
    this.y = (Math.random() > 0.5 ? 1 : -1) * Math.random();
  }

  sum(vector: Vector): Vector {
    let v = new Vector();
    v.x = vector.x + this.x;
    v.y = vector.y + this.y;
    return v;
  }
  diff(vector: Vector): Vector {
    let v = new Vector();
    v.x = vector.x - this.x;
    v.y = vector.y - this.y;
    return v;
  }
  multiply(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }
  toAngle(): number {
    return Math.atan(this.y / this.x) * 180 / Math.PI;
  }
}
