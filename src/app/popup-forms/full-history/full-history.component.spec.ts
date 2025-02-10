import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHistoryComponent } from './full-history.component';

describe('FullHistoryComponent', () => {
  let component: FullHistoryComponent;
  let fixture: ComponentFixture<FullHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
