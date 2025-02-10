import { TestBed } from '@angular/core/testing';

import { DemohotelService } from './demohotel.service';

describe('DemohotelService', () => {
  let service: DemohotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemohotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
