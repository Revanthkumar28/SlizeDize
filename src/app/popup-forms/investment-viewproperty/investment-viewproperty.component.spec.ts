import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentViewpropertyComponent } from './investment-viewproperty.component';

describe('InvestmentViewpropertyComponent', () => {
  let component: InvestmentViewpropertyComponent;
  let fixture: ComponentFixture<InvestmentViewpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentViewpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentViewpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
