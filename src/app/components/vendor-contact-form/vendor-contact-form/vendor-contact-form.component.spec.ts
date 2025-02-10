import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContactFormComponent } from './vendor-contact-form.component';

describe('VendorContactFormComponent', () => {
  let component: VendorContactFormComponent;
  let fixture: ComponentFixture<VendorContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
