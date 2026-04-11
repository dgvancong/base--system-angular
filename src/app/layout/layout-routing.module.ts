import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSystemComponent } from './layout-system/layout-system.component';
import { AuthGuard } from '../core/shared/guards/auth.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'admin/manage-user/all/1' },

  {
    path: '',
    component: LayoutSystemComponent,
    children: [
      {
        path: 'manage-user',
        loadChildren: () => import('../features/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
