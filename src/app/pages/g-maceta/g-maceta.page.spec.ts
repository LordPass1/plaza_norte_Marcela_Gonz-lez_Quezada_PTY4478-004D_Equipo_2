import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GMacetaPage } from './g-maceta.page';

describe('GMacetaPage', () => {
  let component: GMacetaPage;
  let fixture: ComponentFixture<GMacetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GMacetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
