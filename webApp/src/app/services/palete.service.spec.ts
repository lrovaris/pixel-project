import { TestBed } from '@angular/core/testing';

import { PaleteService } from './palete.service';

describe('PaleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaleteService = TestBed.get(PaleteService);
    expect(service).toBeTruthy();
  });
});
