import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementListComponent } from './project-management-list.component';

describe('ProjectManagementListComponent', () => {
  let component: ProjectManagementListComponent;
  let fixture: ComponentFixture<ProjectManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
