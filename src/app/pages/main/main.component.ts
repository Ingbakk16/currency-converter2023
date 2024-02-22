import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CurrencyConversionDto } from 'src/app/interfaces/Currency';
import { AuthService } from 'src/app/services/auth-service.service';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  conversionDto: CurrencyConversionDto = {
    SourceCurrencyId: 0,
    TargetCurrencyId: 0,
    Amount: 0
  };
  conversionResult: any = null;
  showError: boolean = false; // Add a new variable to control the display of the error message
  

  constructor(private currencyService: CurrencyService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async convertCurrency(): Promise<void> {
    const userIdString = this.authService.getUserIdFromToken();
    if (userIdString === null) {
      console.error('User ID not found.');
      return;
    }
  
    const userId = parseInt(userIdString, 10);
    if (isNaN(userId)) {
      console.error('Invalid userId.');
      return;
    }
  
    try {
      const response = await this.currencyService.convertCurrency(userId, this.conversionDto);
      // Adjust according to your response structure
      this.conversionResult = response.convertedAmount;
      this.showError = false; // Reset the showError variable
    } catch (error) {
      console.error('Error during currency conversion:', error);
      this.showError = true; // Set the showError variable to true
    }
  }



  isNumberKey(event: KeyboardEvent) {
    const key = event.key;
    if (key !== undefined && (key < '0' || key > '9')) {
      event.preventDefault();
    }
  }
}