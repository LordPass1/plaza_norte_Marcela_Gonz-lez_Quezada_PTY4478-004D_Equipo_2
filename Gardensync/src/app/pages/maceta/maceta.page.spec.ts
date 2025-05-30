import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacetaPage } from './maceta.page';

describe('MacetaPage', () => {
  let component: MacetaPage;
  let fixture: ComponentFixture<MacetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MacetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
