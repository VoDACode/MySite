import { ProjectModel } from './../../models/ProjectModel';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../../assets/css/content.css', '../../assets/css/urls.css', './block.css']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectModel[] = [];
  @ViewChild('fileExchangerIframe', { static: false })
  fileExchangerIframe: ElementRef<HTMLIFrameElement> | undefined
  constructor(private route: ActivatedRoute) { }

  isView(index: number): boolean {
    return this.projects.findIndex(p => p.select) === index;
  }

  ngOnInit(): void {
    this.projects.push(new ProjectModel("File Exchanger", "Allows you to quickly create your own file sharing.", "FileExchanger", true));
    this.projects.push(new ProjectModel("IIS-web", "Web interface for IIS management.", "IISWeb"));
    this.route.fragment.subscribe(fragment => {
      if(!fragment)
        return;
      var item = this.projects.find(p => p.select);
      if(!!item)
        item.select = false;
      item = this.projects.find(project => project.tag == fragment);
      if(!item){
        
        return;
      }
      item.select = true;
    });
  }
}
