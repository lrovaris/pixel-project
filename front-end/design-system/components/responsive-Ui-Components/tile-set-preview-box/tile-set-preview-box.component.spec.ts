import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSetPreviewBoxComponent } from './tile-set-preview-box.component';

describe('TileSetPreviewBoxComponent', () => {
  let component: TileSetPreviewBoxComponent;
  let fixture: ComponentFixture<TileSetPreviewBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSetPreviewBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSetPreviewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
