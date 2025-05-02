import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'maceta',
    loadChildren: () => import('./pages/maceta/maceta.module').then( m => m.MacetaPageModule)
  },
  {
    path: 'g-maceta',
    loadChildren: () => import('./pages/g-maceta/g-maceta.module').then( m => m.GMacetaPageModule)
  },
  {
    path: 'add-new',
    loadChildren: () => import('./pages/add-new/add-new.module').then( m => m.AddNewPageModule)
  },
  {
    path: 'p-principal',
    loadChildren: () => import('./pages/p-principal/p-principal.module').then( m => m.PPrincipalPageModule)
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
  },  {
    path: 'registro-hogar',
    loadChildren: () => import('./pages/registro-hogar/registro-hogar.module').then( m => m.RegistroHogarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
