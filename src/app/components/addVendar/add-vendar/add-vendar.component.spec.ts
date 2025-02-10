import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendarComponent } from './add-vendar.component';

describe('AddVendarComponent', () => {
  let component: AddVendarComponent;
  let fixture: ComponentFixture<AddVendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
