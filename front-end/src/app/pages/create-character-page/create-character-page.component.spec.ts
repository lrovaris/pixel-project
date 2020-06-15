import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterPageComponent } from './create-character-page.component';

describe('CreateCharacterPageComponent', () => {
  let component: CreateCharacterPageComponent;
  let fixture: ComponentFixture<CreateCharacterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCharacterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
