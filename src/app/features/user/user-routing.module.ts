import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUserComponent,
  },
  {
    path: ':page',
    component: ManageUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
