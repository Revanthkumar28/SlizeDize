import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandBadgeComponent } from './expand-badge.component';

describe('ExpandBadgeComponent', () => {
  let component: ExpandBadgeComponent;
  let fixture: ComponentFixture<ExpandBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
