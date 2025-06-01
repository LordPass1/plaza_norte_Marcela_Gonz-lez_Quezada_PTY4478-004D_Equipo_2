import { TestBed } from '@angular/core/testing';

import { GPTService } from './gpt.service';

describe('GPTService', () => {
  let service: GPTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GPTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
