import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseReorderTableComponent } from './revise-reorder-table.component';

describe('ReviseReorderTableComponent', () => {
  let component: ReviseReorderTableComponent;
  let fixture: ComponentFixture<ReviseReorderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseReorderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseReorderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
