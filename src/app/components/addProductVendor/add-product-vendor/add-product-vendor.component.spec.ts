import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductVendorComponent } from './add-product-vendor.component';

describe('AddProductVendorComponent', () => {
  let component: AddProductVendorComponent;
  let fixture: ComponentFixture<AddProductVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
