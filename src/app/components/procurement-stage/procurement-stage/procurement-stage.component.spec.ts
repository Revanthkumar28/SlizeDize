import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementStageComponent } from './procurement-stage.component';

describe('ProcurementStageComponent', () => {
  let component: ProcurementStageComponent;
  let fixture: ComponentFixture<ProcurementStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
