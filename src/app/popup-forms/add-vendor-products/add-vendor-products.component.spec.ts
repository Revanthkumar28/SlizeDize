import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorProductsComponent } from './add-vendor-products.component';

describe('AddVendorProductsComponent', () => {
  let component: AddVendorProductsComponent;
  let fixture: ComponentFixture<AddVendorProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
