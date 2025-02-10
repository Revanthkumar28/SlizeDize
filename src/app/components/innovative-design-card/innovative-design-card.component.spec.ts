import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeDesignCardComponent } from './innovative-design-card.component';

describe('InnovativeDesignCardComponent', () => {
  let component: InnovativeDesignCardComponent;
  let fixture: ComponentFixture<InnovativeDesignCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovativeDesignCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovativeDesignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
