import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-project-item-in-list',
  templateUrl: './project-item-in-list.component.html',
  styleUrls: ['./project-item-in-list.component.css']
})
export class ProjectItemInListComponent implements AfterViewInit, OnChanges {
  @ViewChild("item", { static: false })
  item: ElementRef<HTMLDivElement> | undefined;
  @Input()
  title: string = "";
  @Input()
  description: string = "";
  @Input()
  selected: boolean = false;
  @Output()
  click = new EventEmitter();
  @Output()
  mouseleave = new EventEmitter();
  @Output()
  mouseenter = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //@ts-ignore
    if (changes.selected !== undefined && !changes.selected.currentValue) {
      //@ts-ignore
      $(this.item?.nativeElement).animate({ opacity: 1 }, 100);
    }
  }
  ngAfterViewInit(): void {
    if (this.selected) {
      //@ts-ignore
      $(this.item?.nativeElement).animate({ opacity: 0.9 }, 100);
    }
  }

  onclick(): void {
    this.click?.emit();
  }
  onmouseleave(): void {
    if (!this.selected)
      //@ts-ignore
      $(this.item?.nativeElement).animate({ opacity: 1 }, 100);
    this.mouseleave?.emit();
  }
  onmouseenter(): void {
    //@ts-ignore
    $(this.item?.nativeElement).animate({ opacity: 0.9 }, 100);
    this.mouseenter?.emit();
  }
}
