import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyManagementRoutingModule } from './currency-management-routing.module';
import { CurrencyManagementComponent } from './currency-management.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CurrencyManagementComponent
  ],
  imports: [
    CommonModule,
    CurrencyManagementRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class CurrencyManagementModule { }
