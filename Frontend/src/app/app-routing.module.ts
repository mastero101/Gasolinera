import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuelRecordTableComponent } from './fuel-record-table/fuel-record-table.component';
import { FuelRecordRegisterComponent } from './fuel-record-register/fuel-record-register.component';
import { FuelRecordEditComponent } from './fuel-record-edit/fuel-record-edit.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'fuel-table', component: FuelRecordTableComponent, canActivate: [AuthGuard] },
  { path: 'fuel-register', component: FuelRecordRegisterComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'fuel-edit', component: FuelRecordEditComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }