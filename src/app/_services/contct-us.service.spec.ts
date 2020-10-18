import { TestBed } from '@angular/core/testing';

import { ContctUsService } from './contct-us.service';

describe('ContctUsService', () => {
  let service: ContctUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContctUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
