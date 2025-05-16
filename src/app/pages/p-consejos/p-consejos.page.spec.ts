import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PConsejosPage } from './p-consejos.page';

describe('PConsejosPage', () => {
  let component: PConsejosPage;
  let fixture: ComponentFixture<PConsejosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PConsejosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
