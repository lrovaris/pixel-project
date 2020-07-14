import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScenarioPageComponent } from './create-scenario-page.component';

describe('CreateScenarioPageComponent', () => {
  let component: CreateScenarioPageComponent;
  let fixture: ComponentFixture<CreateScenarioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScenarioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScenarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
