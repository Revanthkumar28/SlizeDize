import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonMarketplaceComponent } from './comparison-marketplace.component';

describe('ComparisonMarketplaceComponent', () => {
  let component: ComparisonMarketplaceComponent;
  let fixture: ComponentFixture<ComparisonMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonMarketplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
