import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogTableComponent } from './catelog-table.component';

describe('CatelogTableComponent', () => {
  let component: CatelogTableComponent;
  let fixture: ComponentFixture<CatelogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatelogTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
