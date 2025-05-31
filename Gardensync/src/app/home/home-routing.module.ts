import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'p-consejos',
        loadChildren: () => import('../pages/p-consejos/p-consejos.module').then( m => m.PConsejosPageModule)
      },
      {
        path: 'g-maceta',
        loadChildren: () => import('../pages/g-maceta/g-maceta.module').then( m => m.GMacetaPageModule)
      },
      {
        path: 'p-principal',
        loadChildren: () => import('../pages/p-principal/p-principal.module').then( m => m.PPrincipalPageModule)
      },
      {
        path: 'menuadmin',
        loadChildren: () => import('../pages/menuadmin/menuadmin.module').then( m => m.MenuadminPageModule)
      },
      {
        path: 'usuariosregistrados',
        loadChildren: () => import('../pages/usuariosregistrados/usuariosregistrados.module').then( m => m.UsuariosregistradosPageModule)
      },
      {
        path: 'banearusuario',
        loadChildren: () => import('../pages/banearusuario/banearusuario.module').then( m => m.BanearusuarioPageModule)
      },
      {
        path: 'perfil-usuario',
        loadChildren: () => import('../pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
      },
      {
        path: 'editarperfil',
        loadChildren: () => import('../pages/editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
      },
      {
        path: 'cambiarclave',
        loadChildren: () => import('../pages/cambiarclave/cambiarclave.module').then( m => m.CambiarclavePageModule)
      },
      {
        path: 'agregarmaceta',
        loadChildren: () => import('../pages/agregarmaceta/agregarmaceta.module').then( m => m.AgregarmacetaPageModule)
      },
      {
        path: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
