import { TestBed } from '@angular/core/testing';

import { CottagesService } from './cottages.service';

describe('CottagesService', () => {
  let service: CottagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CottagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
