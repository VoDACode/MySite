import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-skills-item',
  templateUrl: './skills-item.component.html',
  styleUrls: ['./skills-item.component.css']
})
export class SkillsItemComponent implements AfterViewInit {

  @ViewChild("textBox", { static: true })
  public textBox: ElementRef<HTMLDivElement> | undefined;

  @Input()
  text: string = "";
  @Input()
  description: string = "";
  @Input()
  size = 16;

  descriptionSize = 0;

  constructor() { }

  ngAfterViewInit(): void {
  }

  textToId(): string {
    return this.text.replace(" ", "_").replace('.', "").replace("#", "_");
  }

  onShowDescription(): void {
    //@ts-ignore
    this.descriptionSize = this.textBox?.nativeElement.clientWidth > 150 ? this.textBox?.nativeElement.clientWidth : 150;

    $(`#skill${this.textToId()}${this.size}`).animate({ opacity: 1 }, 700);
  }
  onHideDescription(): void {
    $(`#skill${this.textToId()}${this.size}`).animate({ opacity: 0 }, 500);
  }
}
