import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobopportunityComponent } from './jobopportunity.component';

describe('JobopportunityComponent', () => {
  let component: JobopportunityComponent;
  let fixture: ComponentFixture<JobopportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobopportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
