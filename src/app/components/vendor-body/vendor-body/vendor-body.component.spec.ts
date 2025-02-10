import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBodyComponent } from './vendor-body.component';

describe('VendorBodyComponent', () => {
  let component: VendorBodyComponent;
  let fixture: ComponentFixture<VendorBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
