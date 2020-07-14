import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'pixel-project-management-page',
  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.scss']
})
export class ProjectManagementPageComponent implements OnInit {

  constructor(private router: Router) { }

  navigateCreateCharacterPage() { this.router.navigate(['character']); }
  navigateCreateUiPage() { this.router.navigate(['ui']); }
  navigateCreateFxPage() { this.router.navigate(['fx']); }
  navigateCreateEnemyPage() { this.router.navigate(['enemy']); }
  navigateCreateScenarioPage() { this.router.navigate(['scenario']); }
  navigateBack() { this.router.navigate(['']); }

  navigate(route) {
    this.router.navigate([route]);
  }

  ngOnInit() {
  }

}
