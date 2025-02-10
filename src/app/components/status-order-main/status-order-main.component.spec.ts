import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrderMainComponent } from './status-order-main.component';

describe('StatusOrderMainComponent', () => {
  let component: StatusOrderMainComponent;
  let fixture: ComponentFixture<StatusOrderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOrderMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOrderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
