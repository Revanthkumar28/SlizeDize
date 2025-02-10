import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrderTableComponent } from './status-order-table.component';

describe('StatusOrderTableComponent', () => {
  let component: StatusOrderTableComponent;
  let fixture: ComponentFixture<StatusOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOrderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
