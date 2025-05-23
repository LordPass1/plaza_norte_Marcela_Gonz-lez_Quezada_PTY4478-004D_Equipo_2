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
        path: '',
        redirectTo: 'p-consejos',
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
