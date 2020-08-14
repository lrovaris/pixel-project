import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesetPageComponent } from './tileset-page.component';

describe('TilesetPageComponent', () => {
  let component: TilesetPageComponent;
  let fixture: ComponentFixture<TilesetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilesetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
