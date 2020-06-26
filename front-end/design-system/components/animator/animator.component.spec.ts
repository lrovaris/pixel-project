import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatorComponent } from './animator.component';

describe('AnimatorComponent', () => {
  let component: AnimatorComponent;
  let fixture: ComponentFixture<AnimatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
