import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroHogarPage } from './registro-hogar.page';

describe('RegistroHogarPage', () => {
  let component: RegistroHogarPage;
  let fixture: ComponentFixture<RegistroHogarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroHogarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
