import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonLeftMenuComponent } from './botton-left-menu.component';

describe('BottonLeftMenuComponent', () => {
  let component: BottonLeftMenuComponent;
  let fixture: ComponentFixture<BottonLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottonLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
