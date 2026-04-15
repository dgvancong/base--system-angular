import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/shared/guards/auth.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'admin' },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    data: { preload: true },
  },

  {
    path: 'admin',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    data: { preload: true },
    // canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
