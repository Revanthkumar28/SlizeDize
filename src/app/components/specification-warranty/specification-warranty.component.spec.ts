import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationWarrantyComponent } from './specification-warranty.component';

describe('SpecificationWarrantyComponent', () => {
  let component: SpecificationWarrantyComponent;
  let fixture: ComponentFixture<SpecificationWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationWarrantyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
