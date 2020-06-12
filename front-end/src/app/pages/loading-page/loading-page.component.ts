import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pixel-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  check1 = false;
  check2 = false;
  check3 = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.check1 = true;
      setTimeout(() => {
        this.check2 = true;
        setTimeout(() => {
          this.check3 = true;
        }, 100);
      }, 100);
    }, 100);
  }

}
