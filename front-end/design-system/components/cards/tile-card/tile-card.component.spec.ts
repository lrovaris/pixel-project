import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCardComponent } from './tile-card.component';

describe('TileCardComponent', () => {
  let component: TileCardComponent;
  let fixture: ComponentFixture<TileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
