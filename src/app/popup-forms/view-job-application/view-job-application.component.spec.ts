import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobApplicationComponent } from './view-job-application.component';

describe('ViewJobApplicationComponent', () => {
  let component: ViewJobApplicationComponent;
  let fixture: ComponentFixture<ViewJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
