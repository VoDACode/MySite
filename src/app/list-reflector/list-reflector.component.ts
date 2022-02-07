import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reflector',
  templateUrl: './list-reflector.component.html',
  styleUrls: ['./list-reflector.component.css']
})
export class ListReflectorComponent implements OnInit {

  private couter = 0;
  @Input()
  items: string[] = [];
  @Input()
  delay: number = 700;
  @Input()
  width: number = 30;

  getWidth: string = "";
  selectItem: string = "";
  constructor() {
  }

  ngOnInit(): void {
    this.getWidth = `${this.width}px`;
    this.selectItem = this.items[0];
    this.couter++;
    setInterval(this.next.bind(this), this.delay);
  }

  public next(): void {
    this.selectItem = this.items[this.couter];
    this.couter++;
    if (this.couter >= this.items.length)
      this.couter = 0;
  }
}
