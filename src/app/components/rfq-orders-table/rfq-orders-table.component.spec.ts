import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersTableComponent } from './rfq-orders-table.component';

describe('RfqOrdersTableComponent', () => {
  let component: RfqOrdersTableComponent;
  let fixture: ComponentFixture<RfqOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqOrdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
