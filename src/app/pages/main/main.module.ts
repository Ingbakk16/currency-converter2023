import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CurrencyDropdownComponent } from "../../components/currency-dropdown/currency-dropdown.component";


@NgModule({
    declarations: [
        MainComponent,
        CurrencyDropdownComponent
        
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        
    ]
})
export class MainModule { 


    isNumberKey(event: KeyboardEvent) {
        const key = event.key;
        if (key !== undefined && (key < '0' || key > '9')) {
          event.preventDefault();
        }
      }

}
