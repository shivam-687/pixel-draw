import { TestBed } from '@angular/core/testing';

import { PixelDrawService } from './pixel-draw.service';

describe('PixelDrawService', () => {
  let service: PixelDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixelDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
