import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleUsageManagementComponent } from './lifecycle-usage-management.component';

describe('LifecycleUsageManagementComponent', () => {
  let component: LifecycleUsageManagementComponent;
  let fixture: ComponentFixture<LifecycleUsageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecycleUsageManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleUsageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
