import { TestBed } from '@angular/core/testing';

import { RentDataService } from './rent-data.service';

describe('RentDataService', () => {
  let service: RentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
