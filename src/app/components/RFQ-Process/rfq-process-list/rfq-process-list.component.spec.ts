import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqProcessListComponent } from './rfq-process-list.component';

describe('RfqProcessListComponent', () => {
  let component: RfqProcessListComponent;
  let fixture: ComponentFixture<RfqProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqProcessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
