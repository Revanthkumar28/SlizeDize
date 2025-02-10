import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoationScreenComponent } from './quoation-screen.component';

describe('QuoationScreenComponent', () => {
  let component: QuoationScreenComponent;
  let fixture: ComponentFixture<QuoationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoationScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
