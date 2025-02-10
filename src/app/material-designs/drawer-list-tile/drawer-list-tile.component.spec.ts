import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerListTileComponent } from './drawer-list-tile.component';

describe('DrawerListTileComponent', () => {
  let component: DrawerListTileComponent;
  let fixture: ComponentFixture<DrawerListTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerListTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
