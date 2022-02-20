import { ProjectModel } from './../../models/ProjectModel';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../../assets/css/content.css', '../../assets/css/urls.css']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];
  @ViewChild('fileExchangerIframe', { static: false })
  fileExchangerIframe: ElementRef<HTMLIFrameElement> | undefined
  constructor() { }

  isView(index: number): boolean {
    return this.projects.findIndex(p => p.select) === index;
  }

  ngOnInit(): void {
    this.projects.push(new ProjectModel("File Exchanger", "Allows you to quickly create your own file sharing.", true));
    this.projects.push(new ProjectModel("IIS-web", "Web interface for IIS management."));
  }

  onclick(item: ProjectModel, index: number): void {
    //@ts-ignore
    this.projects.find(p => p.select)?.select = false;
    this.projects[index].select = true;
  }
}
