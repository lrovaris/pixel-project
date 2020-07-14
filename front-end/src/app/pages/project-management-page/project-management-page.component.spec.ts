import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementPageComponent } from './project-management-page.component';

describe('ProjectManagementPageComponent', () => {
  let component: ProjectManagementPageComponent;
  let fixture: ComponentFixture<ProjectManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
