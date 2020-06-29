import { TestBed } from '@angular/core/testing';

import { SpriteService } from './sprite.service';

describe('SpriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpriteService = TestBed.get(SpriteService);
    expect(service).toBeTruthy();
  });
});
