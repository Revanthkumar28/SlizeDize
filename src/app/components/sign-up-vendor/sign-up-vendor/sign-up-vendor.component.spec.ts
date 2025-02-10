import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpVendorComponent } from './sign-up-vendor.component';

describe('SignUpVendorComponent', () => {
  let component: SignUpVendorComponent;
  let fixture: ComponentFixture<SignUpVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
