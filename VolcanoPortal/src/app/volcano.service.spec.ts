import { TestBed } from '@angular/core/testing';

import { VolcanoService } from './volcano.service';

describe('VolcanoService', () => {
  let service: VolcanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolcanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
