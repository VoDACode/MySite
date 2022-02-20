import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css', '../../assets/css/content.css']
})
export class SkillsComponent implements OnInit {
  skills: SkillItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.skills.push(new SkillItem(".NET", "All serious projects on .NET", 50));
    this.skills.push(new SkillItem("Arduino IDE", "I use the Arduino IDE for robotics and automation.", 24));
    this.skills.push(new SkillItem("Entity Framework", "Entity Framework it`s a very convenient technology for working with databases.", 45));
    this.skills.push(new SkillItem("NodeJS", "A handy tool for quickly creating programs.", 30));
    this.skills.push(new SkillItem("Angular", "A very convenient platform for creating web applications.", 48));
    this.skills.push(new SkillItem("SQL", "Without SQL it is impossible to work with databases.", 35));
    this.skills.push(new SkillItem("jQuery", "The best library for working with web elements.", 40));
    this.skills.push(new SkillItem("Bootstrap", "The best framework for quickly creating a web interface.", 35));
  }

}
class SkillItem {
  text = "";
  description = "";
  size = 16;
  constructor(text: string, description: string, size: number = 16) {
    this.description = description;
    this.text = text;
    this.size = size;
  }
}
