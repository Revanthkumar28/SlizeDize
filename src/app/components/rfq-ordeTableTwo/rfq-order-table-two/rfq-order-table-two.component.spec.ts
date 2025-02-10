import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrderTableTwoComponent } from './rfq-order-table-two.component';

describe('RfqOrderTableTwoComponent', () => {
  let component: RfqOrderTableTwoComponent;
  let fixture: ComponentFixture<RfqOrderTableTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqOrderTableTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrderTableTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
