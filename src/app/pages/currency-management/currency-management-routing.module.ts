import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyDropdownComponent } from 'src/app/components/currency-dropdown/currency-dropdown.component';
import { CurrencyManagementComponent } from './currency-management.component';

const routes: Routes = [


  {
    path:"",
    component:CurrencyManagementComponent
    
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyManagementRoutingModule { }
