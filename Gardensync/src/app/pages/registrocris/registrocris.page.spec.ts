import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrocrisPage } from './registrocris.page';

describe('RegistrocrisPage', () => {
  let component: RegistrocrisPage;
  let fixture: ComponentFixture<RegistrocrisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrocrisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
