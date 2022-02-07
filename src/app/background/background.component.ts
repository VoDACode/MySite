import { Vector } from './models/vectorModel';
import { Version } from '@angular/compiler';
import { Component, ElementRef, AfterViewInit, ViewChild, HostListener, OnInit, NgZone } from '@angular/core';
import { Structure } from './models/structureModel';

@Component({
  selector: 'app-background',
  template: '<canvas #canvas class="bg"></canvas>',
  styles: ['canvas{position:absolute;left:0;top:0;z-index:-1;}']
})
export class BackgroundComponent implements AfterViewInit {
  private bgColor = "#072227";
  private structureCount = 5;
  private maxPointCount = 4;
  private minPointCount = 10;
  private radius: number = 100;
  private structures: Structure[] = [];
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement> | undefined;
  constructor() {
    //@ts-ignore
    document.vector = new Vector(0, -1);
    //@ts-ignore
    document.summon = this.summon.bind(this);
    for (let i = 0; i < this.structureCount; i++) {
      let count = Math.floor(Math.random() * (this.maxPointCount - this.minPointCount + 1)) + this.minPointCount;
      let centerY = 0;
      let centerX = 0;
      do {
        centerY = Math.floor(Math.random() * (window.innerHeight - this.radius * 2)) + this.radius;
        centerX = Math.floor(Math.random() * (window.innerWidth - this.radius * 2)) + this.radius;
      } while (!this.isSummon(centerX, centerY))
      this.summon(count, this.radius, centerX, centerY);
    }
  }

  private summon(count: number, radius: number, centerX: number, centerY: number): void {
    this.structures.push(new Structure(count, radius, centerX, centerY))
  }

  ngAfterViewInit(): void {
    //@ts-ignore
    this.canvas?.nativeElement.width = window.innerWidth;
    //@ts-ignore
    this.canvas?.nativeElement.height = window.innerHeight;
    requestAnimationFrame(this.draw.bind(this));
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    //@ts-ignore
    this.canvas?.nativeElement.width = window.innerWidth;
    //@ts-ignore
    this.canvas?.nativeElement.height = window.innerHeight;
  }
  draw(): void {
    let canvas = document.getElementsByClassName("bg")[0] as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    ctx!.fillStyle = this.bgColor;
    ctx?.fillRect(0, 0, window.innerWidth, window.innerHeight);


    for (let i = 0; i < this.structures.length; i++) {
      ctx!.fillStyle = "white";
      this.structures[i].draw(ctx!);
      this.structures[i].tick();
    }

    if (this.structures.length > 1) {
      for (let m = 0; m < this.structures.length - 1; m++) {
        for (let i = m + 1; i < this.structures.length; i++) {
          let len = this.calculateLen(this.structures[m].centerX, this.structures[m].centerY, this.structures[i].centerX, this.structures[i].centerY);
          if (len <= this.radius * 2 || len <= this.radius * 2 - Math.max(this.structures[m].speed, this.structures[i].speed)) {
            let hit = this.calculateHit(this.structures[m], this.structures[i]);
            this.structures[m] = hit.a;
            this.structures[i] = hit.b;
          }
        }
      }
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  private isSummon(cX: number, cY: number): boolean {
    for (let m = 0; m < this.structures.length; m++) {
      for (let i = m; i < this.structures.length; i++) {
        let len = this.calculateLen(this.structures[m].centerX, this.structures[m].centerY, cX, cY);
        if (len <= this.radius * 2) {
          return false;
        }
      }
    }
    return true;
  }

  private calculateHit(item1: Structure, item2: Structure): { a: Structure, b: Structure } {
    let m1 = item1.points.length;
    let m2 = item2.points.length;
    let v1 = item1.speed;
    let v2 = item2.speed;
    let a1 = item1.vector.toAngle();
    let a2 = item2.vector.toAngle();
    let f = Math.abs(a1) + Math.abs(a2);
    item1.speed = this.limiter((2 * m2 * item2.speed + item1.speed * (m1 - m2)) / (m1 + m2), -1, 1);
    item2.speed = this.limiter((2 * m1 * item1.speed + item2.speed * (m2 - m1)) / (m1 + m2), -1, 1);
    item1.vector.x = ((v1 * Math.cos(a1 - f) * (m1 - m2) + 2 * m2 * v2 * Math.cos(a2 - f)) / (m1 + m2)) * Math.cos(f) + v1 * Math.sin(a1 - f) * Math.cos(f + Math.PI / 2);
    item1.vector.y = ((v1 * Math.cos(a1 - f) * (m1 - m2) + 2 * m2 * v2 * Math.cos(a2 - f)) / (m1 + m2)) * Math.sin(f) + v1 * Math.sin(a1 - f) * Math.cos(f + Math.PI / 2);
    item2.vector.x = ((v2 * Math.cos(a2 - f) * (m2 - m1) + 2 * m1 * v1 * Math.cos(a1 - f)) / (m1 + m2)) * Math.cos(f) + v2 * Math.sin(a2 - f) * Math.cos(f + Math.PI / 2);
    item2.vector.y = ((v2 * Math.cos(a2 - f) * (m2 - m1) + 2 * m1 * v1 * Math.cos(a1 - f)) / (m1 + m2)) * Math.sin(f) + v2 * Math.sin(a2 - f) * Math.cos(f + Math.PI / 2);
    item1.normalization();
    item2.normalization();
    return { a: item1, b: item2 };
  }

  private limiter(num: number, min: number, max: number): number {
    if (num > max)
      num = max;
    else if (num < min)
      num = min;
    return num;
  }

  private calculateLen(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}
