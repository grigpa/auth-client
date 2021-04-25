import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
