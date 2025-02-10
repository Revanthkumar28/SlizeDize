import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbySelectionCardComponent } from './filterby-selection-card.component';

describe('FilterbySelectionCardComponent', () => {
  let component: FilterbySelectionCardComponent;
  let fixture: ComponentFixture<FilterbySelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterbySelectionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbySelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
