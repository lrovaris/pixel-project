import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCarrouselBoxComponent } from './tile-carrousel-box.component';

describe('TileCarrouselBoxComponent', () => {
  let component: TileCarrouselBoxComponent;
  let fixture: ComponentFixture<TileCarrouselBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileCarrouselBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileCarrouselBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
