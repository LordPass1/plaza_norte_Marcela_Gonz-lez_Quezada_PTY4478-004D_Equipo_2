import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'maceta',
        loadChildren: () => import('../pages/maceta/maceta.module').then( m => m.MacetaPageModule)
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
        path: 'consejos',
        loadChildren: () => import('../pages/p-consejos/p-consejos.module').then( m => m.PConsejosPageModule)
      },
      {
        path: '',
        redirectTo: 'p-principal',
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
