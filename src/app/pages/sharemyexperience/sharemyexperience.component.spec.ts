import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharemyexperienceComponent } from './sharemyexperience.component';

describe('SharemyexperienceComponent', () => {
  let component: SharemyexperienceComponent;
  let fixture: ComponentFixture<SharemyexperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharemyexperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharemyexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
