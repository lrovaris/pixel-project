import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftImageListComponent } from './left-image-list.component';

describe('LeftImageListComponent', () => {
  let component: LeftImageListComponent;
  let fixture: ComponentFixture<LeftImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
