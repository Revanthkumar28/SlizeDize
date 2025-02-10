import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVendorDetailComponent } from './all-vendor-detail.component';

describe('AllVendorDetailComponent', () => {
  let component: AllVendorDetailComponent;
  let fixture: ComponentFixture<AllVendorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVendorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVendorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
