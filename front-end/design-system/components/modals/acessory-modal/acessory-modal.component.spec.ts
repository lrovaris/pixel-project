import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoryModalComponent } from './acessory-modal.component';

describe('AcessoryModalComponent', () => {
  let component: AcessoryModalComponent;
  let fixture: ComponentFixture<AcessoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
