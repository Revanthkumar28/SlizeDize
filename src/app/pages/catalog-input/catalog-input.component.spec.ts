import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogInputComponent } from './catalog-input.component';

describe('CatalogInputComponent', () => {
  let component: CatalogInputComponent;
  let fixture: ComponentFixture<CatalogInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
