import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service'

@Component({
  selector: 'pixel-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private router: RouteService) { }

  navigateBack() { this.router.navigateTo('home'); }

  ngOnInit() {
  }

}
