import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrowComponent } from './trow.component';

describe('TrowComponent', () => {
  let component: TrowComponent;
  let fixture: ComponentFixture<TrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
