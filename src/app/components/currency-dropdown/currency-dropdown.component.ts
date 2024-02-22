import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyForDisplay } from 'src/app/interfaces/Currency';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss']
})
export class CurrencyDropdownComponent implements OnInit {
  @Input() selectedCurrencyId: number = 0; // Default to 0 or any appropriate default value
  @Output() selectedCurrencyIdChange = new EventEmitter<number>();

  
  isOpen: boolean = false;
  currencies: CurrencyForDisplay[] = []; 
  favorites: CurrencyForDisplay[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.getCurrencies();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectCurrency(currency: CurrencyForDisplay) {
    
    this.selectedCurrencyId = currency.currencyId;
    this.selectedCurrencyIdChange.emit(this.selectedCurrencyId);
    this.isOpen = false;
  }

 
  getCurrencies() {
    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        this.currencies = response;
      },
      error: (error) => {
        console.log('Error retrieving currencies:', error);
      }
    });
  }

  getCurrenyName(currencyId: number): string {
    const selectedCurrency = this.currencies.find(currency => currency.currencyId === currencyId);
    return selectedCurrency ? selectedCurrency.currencyName : '';
  }
  
}
