import { TestBed } from '@angular/core/testing';

import { TreffleService } from './treffle.service';

describe('TreffleService', () => {
  let service: TreffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
