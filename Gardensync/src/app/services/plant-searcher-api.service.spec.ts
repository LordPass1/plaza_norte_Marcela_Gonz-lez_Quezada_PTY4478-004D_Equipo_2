import { TestBed } from '@angular/core/testing';

import { PlantSearcherAPIService } from './plant-searcher-api.service';

describe('PlantSearcherAPIService', () => {
  let service: PlantSearcherAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantSearcherAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
