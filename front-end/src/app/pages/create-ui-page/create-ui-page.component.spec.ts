import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUIPageComponent } from './create-ui-page.component';

describe('CreateUIPageComponent', () => {
  let component: CreateUIPageComponent;
  let fixture: ComponentFixture<CreateUIPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUIPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
