import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBorderAndBottonBoxComponent } from './inner-border-and-botton-box.component';

describe('InnerBorderAndBottonBoxComponent', () => {
  let component: InnerBorderAndBottonBoxComponent;
  let fixture: ComponentFixture<InnerBorderAndBottonBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerBorderAndBottonBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerBorderAndBottonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
