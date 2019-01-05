import { TestBed } from '@angular/core/testing';

import { FalconeServiceService } from './falcone-service.service';

describe('FalconeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FalconeServiceService = TestBed.get(FalconeServiceService);
    expect(service).toBeTruthy();
  });
});
