import { TestBed } from '@angular/core/testing';

import { GBIFAPIService } from './gbif-api.service';

describe('GBIFAPIService', () => {
  let service: GBIFAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GBIFAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
