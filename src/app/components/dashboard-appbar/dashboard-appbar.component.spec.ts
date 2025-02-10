import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAppbarComponent } from './dashboard-appbar.component';

describe('DashboardAppbarComponent', () => {
  let component: DashboardAppbarComponent;
  let fixture: ComponentFixture<DashboardAppbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAppbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
