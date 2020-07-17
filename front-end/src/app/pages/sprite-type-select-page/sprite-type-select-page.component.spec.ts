import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteTypeSelectPageComponent } from './sprite-type-select-page.component';

describe('SpriteTypeSelectPageComponent', () => {
  let component: SpriteTypeSelectPageComponent;
  let fixture: ComponentFixture<SpriteTypeSelectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteTypeSelectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteTypeSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
