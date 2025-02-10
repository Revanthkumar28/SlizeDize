import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAdminComponent } from './investment-admin.component';

describe('InvestmentAdminComponent', () => {
  let component: InvestmentAdminComponent;
  let fixture: ComponentFixture<InvestmentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
