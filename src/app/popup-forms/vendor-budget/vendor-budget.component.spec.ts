import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBudgetComponent } from './vendor-budget.component';

describe('VendorBudgetComponent', () => {
  let component: VendorBudgetComponent;
  let fixture: ComponentFixture<VendorBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
