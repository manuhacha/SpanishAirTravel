import { TestBed } from '@angular/core/testing';

import { OpenSkyService } from './open-sky.service';

describe('OpenSkyService', () => {
  let service: OpenSkyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenSkyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
