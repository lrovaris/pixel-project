import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pixel-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  constructor(private router: Router) { }

  navigateAdmProjeto() { this.router.navigate(['management']); }
  navigateContact() { this.router.navigate(['contact']); }

  ngOnInit() {
  }

}
