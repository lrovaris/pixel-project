import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service'

@Component({
  selector: 'pixel-project-management-page',
  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.scss']
})
export class ProjectManagementPageComponent implements OnInit {

  constructor(private router: RouteService) { }

  navigateCreateCharacterPage() { this.navigate('character'); }
  navigateCreateUiPage() { this.navigate('ui'); }
  navigateCreateFxPage() { this.navigate('fx'); }
  navigateCreateEnemyPage() { this.navigate('enemy'); }
  navigateCreateScenarioPage() { this.navigate('scenario'); }
  navigateBack() { this.navigate('home'); }

  navigate(route) {
    this.router.navigateTo(route);
  }

  ngOnInit() {
  }

}
