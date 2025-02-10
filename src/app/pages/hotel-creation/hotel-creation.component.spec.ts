import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCreationComponent } from './hotel-creation.component';

describe('HotelCreationComponent', () => {
  let component: HotelCreationComponent;
  let fixture: ComponentFixture<HotelCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
