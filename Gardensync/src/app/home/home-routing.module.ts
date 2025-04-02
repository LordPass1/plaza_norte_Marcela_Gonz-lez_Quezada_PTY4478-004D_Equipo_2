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
        path: 'add-new',
        loadChildren: () => import('../pages/add-new/add-new.module').then( m => m.AddNewPageModule)
      },
      {
        path: '',
        redirectTo: 'maceta',
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
