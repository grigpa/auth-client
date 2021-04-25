import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {LoggedInGuard} from '../auth/logged-in.guard';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
