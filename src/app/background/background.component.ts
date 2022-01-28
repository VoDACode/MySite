import { Version } from '@angular/compiler';
import { Component, ElementRef, AfterViewInit , ViewChild, HostListener, OnInit, NgZone } from '@angular/core';
import { Structure } from './models/structureModel';

@Component({
  selector: 'app-background',
  template: '<canvas #canvas class="bg"></canvas>',
  styles:['canvas{position:absolute;left:0;top:0;z-index:-1;}']
})
export class BackgroundComponent implements AfterViewInit{
  private bgColor = "#072227";
  private structureCount = 20;
  private structures: Structure[] = [];
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement> | undefined;
  constructor() {
    console.log(1)
    for(let i = 0; i < this.structureCount; i++){
      this.structures.push(new Structure(Math.floor(Math.random() * (6 - 2)) + 2))
    }
  }
  ngAfterViewInit(): void {
    //@ts-ignore
    this.canvas?.nativeElement.width = window.innerWidth;
    //@ts-ignore
    this.canvas?.nativeElement.height = window.innerHeight;
    setInterval(this.draw.bind(this), 30);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(screen);
    //@ts-ignore
    this.canvas?.nativeElement.width = window.innerWidth;
    //@ts-ignore
    this.canvas?.nativeElement.height = window.innerHeight;
  }

  draw(): void{
    let canvas = document.getElementsByClassName("bg")[0] as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    ctx!.fillStyle = this.bgColor;
    ctx?.fillRect(0, 0, window.innerWidth ,window.innerHeight);


    for(let i = 0; i < this.structures.length; i++){
      ctx!.fillStyle = "white";
      this.structures[i].draw(ctx!);
    }
  }
}
