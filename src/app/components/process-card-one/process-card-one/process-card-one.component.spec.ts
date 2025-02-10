import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCardOneComponent } from './process-card-one.component';

describe('ProcessCardOneComponent', () => {
  let component: ProcessCardOneComponent;
  let fixture: ComponentFixture<ProcessCardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCardOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
