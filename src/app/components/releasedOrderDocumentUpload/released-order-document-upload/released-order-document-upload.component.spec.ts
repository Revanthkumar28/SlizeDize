import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedOrderDocumentUploadComponent } from './released-order-document-upload.component';

describe('ReleasedOrderDocumentUploadComponent', () => {
  let component: ReleasedOrderDocumentUploadComponent;
  let fixture: ComponentFixture<ReleasedOrderDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasedOrderDocumentUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasedOrderDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
