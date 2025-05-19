import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuadminPage } from './menuadmin.page';

describe('MenuadminPage', () => {
  let component: MenuadminPage;
  let fixture: ComponentFixture<MenuadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
