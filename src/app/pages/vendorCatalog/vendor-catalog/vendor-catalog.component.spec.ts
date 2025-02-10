import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCatalogComponent } from './vendor-catalog.component';

describe('VendorCatalogComponent', () => {
  let component: VendorCatalogComponent;
  let fixture: ComponentFixture<VendorCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
