import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCardTwoComponent } from './process-card-two.component';

describe('ProcessCardTwoComponent', () => {
  let component: ProcessCardTwoComponent;
  let fixture: ComponentFixture<ProcessCardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCardTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
