import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnemyPageComponent } from './create-enemy-page.component';

describe('CreateEnemyPageComponent', () => {
  let component: CreateEnemyPageComponent;
  let fixture: ComponentFixture<CreateEnemyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEnemyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnemyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
