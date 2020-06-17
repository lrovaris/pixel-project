import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInListComponent } from './image-in-list.component';

describe('ImageInListComponent', () => {
  let component: ImageInListComponent;
  let fixture: ComponentFixture<ImageInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
