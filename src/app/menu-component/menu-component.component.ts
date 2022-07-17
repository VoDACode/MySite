import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements AfterViewInit {
  @Input()
  imgSrc: string = "";
  @Input()
  url: string = "";
  @Input()
  redirectUrl: string | undefined;
  @Input()
  tip: string = "";
  @Output()
  onselect = new EventEmitter<MenuItemSelectEvent>();


  selected: boolean = false;

  showTip = false;
  constructor(private router: Router) {
  }
  ngAfterViewInit(): void {
    if (this.redirectUrl == undefined) {
      this.redirectUrl = this.url;
    }
    this.router.events.subscribe((val) => {
      //@ts-ignore
      if (!val.url)
        return;
      //@ts-ignore
      let url = val.url.slice(1).split('#')[0];
      this.selected = (url == this.redirectUrl || this.url == url);
      if (this.selected) {
        let data = new MenuItemSelectEvent();
        data.imgSrc = this.imgSrc;
        data.redirectUrl = this.redirectUrl;
        data.url = this.url;
        this.onselect.emit(data);
      }
    });
  }
  onMouseLeave(): void {
    this.showTip = false;
  }
  onMousEnter(): void {
    this.showTip = true;
  }
}

export class MenuItemSelectEvent {
  url: string = "";
  redirectUrl: string | undefined;
  imgSrc: string = "";
}
