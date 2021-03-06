import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
  }

  navigateList() {
    this.router.navigate(['list']);
  }

  navigateUpload() {
    this.router.navigate(['upload']);
  }

  navigatePaleta() {
    this.router.navigate(['paleta']);
  }

  navigateTileSet() {
    this.router.navigate(['tileset']);
  }

}
