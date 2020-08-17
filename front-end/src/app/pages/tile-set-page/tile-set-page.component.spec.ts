import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSetPageComponent } from './tile-set-page.component';

describe('TileSetPageComponent', () => {
  let component: TileSetPageComponent;
  let fixture: ComponentFixture<TileSetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
