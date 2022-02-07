import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { MenuItemSelectEvent } from '../menu-component/menu-component.component';
import * as $ from 'jquery';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  items: ItemInMitiMenu[] = [];
  @ViewChild("fullBox", { static: false })
  private fullBox: ElementRef<HTMLDivElement> | undefined;
  isFullSize = true;

  isStartMinAnimation = false;
  isStartMaxAnimation = false;
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.items.push(new ItemInMitiMenu("icons8-back-24.png", "/", this.onback.bind(this)));
    this.items.push(new ItemInMitiMenu("about.png", "/about", this.onclickMiniItem.bind(this)));
    this.items.push(new ItemInMitiMenu("icons8-server-60.png", "/skills", this.onclickMiniItem.bind(this)));
    this.items.push(new ItemInMitiMenu("icons8-code-96.png", "/projects", this.onclickMiniItem.bind(this)));
    this.items.push(new ItemInMitiMenu("icons8-contact-58.png", "/contacts", this.onclickMiniItem.bind(this)));
    this.items.push(new ItemInMitiMenu("icons8-donate-100.png", "/donate", this.onclickMiniItem.bind(this)));
  }

  //#region Onclick menu items
  onback(): void {
    this.router.navigate(['']);
    this.maxAnimation();
    this.isStartMaxAnimation = true;
    this.isFullSize = true;
  }

  onSelectItem(event: MenuItemSelectEvent): void {
    this.minAnimation();
    this.isFullSize = false;
    this.isStartMinAnimation = true;
  }

  onclickMiniItem(item: ItemInMitiMenu): void {
    let previousIndex = this.items.findIndex(p => p.selected);
    let currentIndex = this.items.findIndex(p => p == item);
    if (previousIndex == -1) {
      previousIndex = this.items.findIndex(p => p.routerLink == location.pathname);
    }
    if (previousIndex == 0 || previousIndex == currentIndex) {
      this.router.navigate([item.routerLink]);
      return;
    }
    this.items[currentIndex].selected = true;
    if (previousIndex != -1) {
      this.items[previousIndex].selected = false;
      this.choiceAnimation(currentIndex, previousIndex, () => {
        this.router.navigate([item.routerLink]);
      });
    }
  }
  //#endregion

  //#region Choice animation
  choiceAnimation(currentIndex: number, previousIndex: number, ended: Function): void {
    if (currentIndex > previousIndex) {
      this.goToAnimation('right', ended);
    } else if (currentIndex < previousIndex) {
      this.goToAnimation('left', ended);
    } else {
      return;
    }
  }
  private goToAnimation(side: 'left' | 'right', ended: Function) {
    this.clearScrollAnimation(side);
    $(".content-box").animate({ top: "100px", bottom: "5%", left: "5%", right: "5%" }, 250, () => {
      let gotoObj = side == "left" ? { right: "-45%", left: "100%" } : { right: "100%", left: "-45%" }
      $(".content-box").animate(gotoObj, 1500);
      setTimeout(() =>
        this.scrollAnimation(side, () => {
          ended();
          this.clearContentScrollAnimation();
          setInterval(() => this.clearScrollAnimation(side), 100);
        }), 100);
    });
  }
  private scrollAnimation(side: 'left' | 'right', callback: Function): void {
    let counter = 0;
    const f = () => {
      if (1 <= counter) {
        callback();
        return;
      }
      counter++;
      this.clearScrollAnimation(side);
      $(`.preview-content-box.${side}`).animate({ left: '5%', right: '5%' }, 1500, () =>
        $(`.preview-content-box.${side}`).animate({ top: "80px", bottom: "0", left: '0', right: '0' }, 700, f));
    }
    f();
  }
  private clearContentScrollAnimation() {
    $(".content-box").css("top", "80px").css("bottom", "0").css("right", "0").css("left", "0").css("zoom", "100%").css("opacity", "1").css("display", "block");
  }
  private clearScrollAnimation(side: 'left' | 'right') {
    $(`.preview-content-box.${side}`).css("bottom", "5%");
    $(`.preview-content-box.${side}`).css("top", "100px");
    if (side == "left") {
      $(`.preview-content-box.left`).css("left", "-45%");
      $(`.preview-content-box.left`).css("right", "100%");
    } else if (side == 'right') {
      $(`.preview-content-box.right`).css("left", "100%");
      $(`.preview-content-box.right`).css("right", "-45%");
    }
  }
  //#endregion

  //#region Open min/max menu
  maxAnimation(): void {
    if (this.isStartMaxAnimation)
      return;

    $(".menu-mini > .content").animate({ opacity: '0' }, 250, () => {
      $(this.fullBox?.nativeElement!).animate({ marginTop: '10%' }, 1250);
      $(".menu-mini > .load.left").animate({ width: '0' }, 1250);
      $(".menu-mini > .load.right").animate({ width: '0' }, 1250, () => {
        this.isStartMaxAnimation = false;
      });
      $(".menu-mini > .load.left").animate({ opacity: '0.5' }, 500);
      $(".menu-mini > .load.right").animate({ opacity: '0.5' }, 500);
    });
    console.log("EDIT .content-box");
    $(".content-box").animate({ left: '45%', right: '45%', bottom: '45%', top: '45%', zoom: '0' }, 1000, () => {
      $(".content-box").animate({ opacity: '0' }, 500);
    });
  }

  minAnimation(): void {
    if (this.isStartMinAnimation)
      return;
    $(this.fullBox?.nativeElement!).animate({
      marginTop: (this.fullBox?.nativeElement.clientHeight! + 200) * -1
    }, 1250)
    $(".menu-mini > .load.left").animate({ width: '50%' }, 1250, () => {
      $(".menu-mini > .load.left").animate({ opacity: '0.7' }, 500);
      $(".menu-mini > .content").animate({ opacity: '1' }, 250);
    });
    $(".menu-mini > .load.right").animate({ width: '50%' }, 1250, () => {
      $(".menu-mini > .load.right").animate({ opacity: '0.7' }, 500);
      $(".menu-mini > .content").animate({ opacity: '1' }, 250, () => {
        this.isStartMinAnimation = false;
      });
    });
    if (this.isFullSize)
      $(".content-box").animate({ opacity: '1' }, 500, () => {
        $(".content-box").animate({ left: '0', right: '0', bottom: '0', top: '80px', zoom: '100%' }, 1000);
      });
  }
  //#endregion
}

class ItemInMitiMenu {
  selected = false;
  img: string = "";
  routerLink: string = "";
  onclick: Function;
  constructor(img: string, routerLink: string, onclick: Function) {
    this.img = img;
    this.routerLink = routerLink;
    this.onclick = onclick;
  }
}
