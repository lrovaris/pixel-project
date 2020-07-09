import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxUnderDisplayComponent } from './box-under-display.component';

describe('BoxUnderDisplayComponent', () => {
  let component: BoxUnderDisplayComponent;
  let fixture: ComponentFixture<BoxUnderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxUnderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxUnderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
