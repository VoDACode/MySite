import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public age: number = 0;
  public iLike: string[] = ["Programming", "Electronics", "Robotics", "Bicycles"];
  public devList: string[] = ["C#", "JS", "TC", "C++"];
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

  ngOnInit(): void {
  }

}
