import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../services/route.service'

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pixel-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: RouteService) { }

  navigateAdmProjeto() { this.router.navigateTo('management'); }
  navigateContact() { this.router.navigateTo('contact'); }

  ngOnInit() {
  }

}
