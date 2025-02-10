import { TestBed } from '@angular/core/testing';

import { MagentoProductService } from './magento-product.service';

describe('MagentoProductService', () => {
  let service: MagentoProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagentoProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
