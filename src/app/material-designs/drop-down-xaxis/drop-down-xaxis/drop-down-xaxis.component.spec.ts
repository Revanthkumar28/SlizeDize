import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownXaxisComponent } from './drop-down-xaxis.component';

describe('DropDownXaxisComponent', () => {
  let component: DropDownXaxisComponent;
  let fixture: ComponentFixture<DropDownXaxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownXaxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownXaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
