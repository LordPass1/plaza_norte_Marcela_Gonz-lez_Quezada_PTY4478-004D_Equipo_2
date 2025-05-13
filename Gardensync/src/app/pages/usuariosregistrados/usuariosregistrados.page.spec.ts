import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosregistradosPage } from './usuariosregistrados.page';

describe('UsuariosregistradosPage', () => {
  let component: UsuariosregistradosPage;
  let fixture: ComponentFixture<UsuariosregistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosregistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
