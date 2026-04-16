import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadComponent } from './pages/dashboad/dashboad.component';
const routes: Routes = [
  {
    path: '',
    component: DashboadComponent,
  },

  {
    path: ':page',
    component: DashboadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
