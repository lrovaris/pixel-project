import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteTypeSelectListComponent } from './sprite-type-select-list.component';

describe('SpriteTypeSelectListComponent', () => {
  let component: SpriteTypeSelectListComponent;
  let fixture: ComponentFixture<SpriteTypeSelectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteTypeSelectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteTypeSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
