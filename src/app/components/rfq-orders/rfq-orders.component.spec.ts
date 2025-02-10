import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersComponent } from './rfq-orders.component';

describe('RfqOrdersComponent', () => {
  let component: RfqOrdersComponent;
  let fixture: ComponentFixture<RfqOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
