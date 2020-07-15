import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletaPageComponent } from './paleta-page.component';

describe('PaletaPageComponent', () => {
  let component: PaletaPageComponent;
  let fixture: ComponentFixture<PaletaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
