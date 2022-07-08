import { environment } from './../../environments/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css', '../../assets/css/content.css']
})
export class AboutMeComponent implements AfterViewInit {
  public age: number = 0;
  public devList(): DevViewModel[] {
    return environment.DevList;
  }
  public iLike(): string[] {
    return environment.ILike;
  }
  constructor() {
    let dob = new Date(2004, 0, 16);
    let date = new Date();
    this.age = date.getFullYear() - dob.getFullYear();
    if (date.getMonth() == dob.getMonth() && date.getDate() < dob.getDate()) {
      this.age--;
    } else if (date.getMonth() < dob.getMonth()) {
      this.age--;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      $(".my-name").animate({ opacity: 1 }, 2000);
      setTimeout(() => {
        $(".title-string").animate({ opacity: 1 }, 1250, () => {
          for (let i = 0; i < environment.ILike.length; i++) {
            $(`#skills-content-item-${i}`).animate({ top: `${80 * i + 20}px` }, 1000);
          }
          for (let i = 0; i < environment.DevList.length; i++) {
            $(`#develop-content-item-${i}`).animate({ top: `${80 * i + 20}px` }, 1000);
          }
        });
        $(".about-skills p").animate({ opacity: 1 }, 1500);
        $(".i-develop-in__content__item img").animate({ opacity: 1 }, 1500);
      }, 500);
    }, 1000);
  }

  ngOnInit(): void {
  }

}

class DevViewModel {
  text: string = "";
  img: string = "";
  constructor(text: string, img: string) {
    this.text = text;
    this.img = img;
  }
}
