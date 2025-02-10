import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalProcessTrackComponent } from './approval-process-track.component';

describe('ApprovalProcessTrackComponent', () => {
  let component: ApprovalProcessTrackComponent;
  let fixture: ComponentFixture<ApprovalProcessTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalProcessTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalProcessTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
