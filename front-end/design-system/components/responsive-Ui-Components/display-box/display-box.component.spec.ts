import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBoxComponent } from './display-box.component';

describe('DisplayBoxComponent', () => {
  let component: DisplayBoxComponent;
  let fixture: ComponentFixture<DisplayBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
