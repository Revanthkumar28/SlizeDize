import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmailComponent } from './chat-email.component';

describe('ChatEmailComponent', () => {
  let component: ChatEmailComponent;
  let fixture: ComponentFixture<ChatEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
