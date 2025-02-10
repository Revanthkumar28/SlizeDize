import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeDesignComponent } from './innovative-design.component';

describe('InnovativeDesignComponent', () => {
  let component: InnovativeDesignComponent;
  let fixture: ComponentFixture<InnovativeDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovativeDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovativeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
