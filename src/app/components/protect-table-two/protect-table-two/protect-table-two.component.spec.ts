import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectTableTwoComponent } from './protect-table-two.component';

describe('ProtectTableTwoComponent', () => {
  let component: ProtectTableTwoComponent;
  let fixture: ComponentFixture<ProtectTableTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectTableTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectTableTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
