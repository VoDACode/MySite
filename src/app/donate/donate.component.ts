import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard'
import * as $ from 'jquery';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css', '../../assets/css/content.css', '../../assets/css/urls.css']
})
export class DonateComponent implements OnInit {

  bitKey = "03b7a31c8cf22273fa69f04b03b237fb82906eec64c8bbc9f8c32ad45f51b979c6";
  constructor(private clipboard: ClipboardService) { }

  ngOnInit(): void {
  }

  copyBit(): void {
    $(".bit>.content").animate({ opacity: 0 }, 400);
    $(".bit>.click").animate({ opacity: 1 }, 500, () => {
      setTimeout(() => {
        $(".bit>.click").animate({ opacity: 0 }, 400);
        $(".bit>.content").animate({ opacity: 1 }, 500);
      }, 500);
    });
    this.clipboard.copy(this.bitKey);
  }

}
