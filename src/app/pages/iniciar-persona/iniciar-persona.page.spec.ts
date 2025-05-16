import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarPersonaPage } from './iniciar-persona.page';

describe('IniciarPersonaPage', () => {
  let component: IniciarPersonaPage;
  let fixture: ComponentFixture<IniciarPersonaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
