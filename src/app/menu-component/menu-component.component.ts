import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements AfterViewInit, OnInit {
  @Input()
  imgSrc: string = "";
  @Input()
  url: string = "";
  @Input()
  redirectUrl: string | undefined;
  selected: boolean = false;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    if(!this.redirectUrl){
      this.redirectUrl = this.url;
    }
  }
  ngAfterViewInit(): void {
    this.router.events.subscribe((val) => {
      //@ts-ignore
      if(!val.url)
        return;
      //@ts-ignore
      let url = val.url.slice(1);
      this.selected = (url == this.redirectUrl || this.url == url);
    });
  }
}
