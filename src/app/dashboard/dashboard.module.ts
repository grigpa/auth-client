import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing';
import {AuthModule} from '../auth/auth.module';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard.component';
import {UpdateComponent} from './update/update.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    AuthModule
  ],
  declarations: [HeaderComponent, DashboardComponent, UpdateComponent]
})
export class DashboardModule {
}
