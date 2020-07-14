import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFXPageComponent } from './create-fx-page.component';

describe('CreateFXPageComponent', () => {
  let component: CreateFXPageComponent;
  let fixture: ComponentFixture<CreateFXPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFXPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFXPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
