import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
