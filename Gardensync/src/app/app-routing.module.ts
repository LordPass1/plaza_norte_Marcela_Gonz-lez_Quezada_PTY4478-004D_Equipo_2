import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard.guard';

const routes: Routes = [
  {
    path: 'iniciar-persona',
    loadChildren: () => import('./pages/iniciar-persona/iniciar-persona.module').then( m => m.IniciarPersonaPageModule)
  },
  {
    path: '',
    redirectTo: 'iniciar-persona',
    pathMatch: 'full'
  },
  {
    path: 'g-maceta',
    loadChildren: () => import('./pages/g-maceta/g-maceta.module').then( m => m.GMacetaPageModule)
  },
  {
    path: 'p-principal',
    loadChildren: () => import('./pages/p-principal/p-principal.module').then( m => m.PPrincipalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'p-consejos',
    loadChildren: () => import('./pages/p-consejos/p-consejos.module').then( m => m.PConsejosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },{
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro-hogar',
    loadChildren: () => import('./pages/registro-hogar/registro-hogar.module').then( m => m.RegistroHogarPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'modificarmaceta',
    loadChildren: () => import('./pages/modificarmaceta/modificarmaceta.module').then( m => m.ModificarmacetaPageModule)
  },
  {
    path: 'menuadmin',
    loadChildren: () => import('./pages/menuadmin/menuadmin.module').then( m => m.MenuadminPageModule)
  },
  {
    path: 'usuariosregistrados',
    loadChildren: () => import('./pages/usuariosregistrados/usuariosregistrados.module').then( m => m.UsuariosregistradosPageModule)
  },
  {
    path: 'banearusuario',
    loadChildren: () => import('./pages/banearusuario/banearusuario.module').then( m => m.BanearusuarioPageModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./pages/cambiarclave/cambiarclave.module').then( m => m.CambiarclavePageModule)
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
