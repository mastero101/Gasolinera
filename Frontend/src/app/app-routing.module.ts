import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuelRecordTableComponent } from './fuel-record-table/fuel-record-table.component';
import { FuelRecordRegisterComponent } from './fuel-record-register/fuel-record-register.component';
import { FuelRecordEditComponent } from './fuel-record-edit/fuel-record-edit.component';

const routes: Routes = [
  { path: 'fuel-table', component: FuelRecordTableComponent },
  { path: 'fuel-register', component: FuelRecordRegisterComponent},
  { path: 'fuel-edit', component: FuelRecordEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }