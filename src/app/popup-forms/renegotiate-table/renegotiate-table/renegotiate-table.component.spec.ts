import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenegotiateTableComponent } from './renegotiate-table.component';

describe('RenegotiateTableComponent', () => {
  let component: RenegotiateTableComponent;
  let fixture: ComponentFixture<RenegotiateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenegotiateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenegotiateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
