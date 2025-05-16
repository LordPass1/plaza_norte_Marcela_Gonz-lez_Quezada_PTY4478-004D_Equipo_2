import { TestBed } from '@angular/core/testing';

import { PernualApiService } from './pernual-api.service';

describe('PernualApiService', () => {
  let service: PernualApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PernualApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
