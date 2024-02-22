import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyForCreationDto } from 'src/app/interfaces/Currency';
import { CurrencyService } from 'src/app/services/currency-service.service';

@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.scss']
})
export class CurrencyManagementComponent implements OnInit {
  currencyForm!: FormGroup; // Add the definite assignment assertion
  deleteCurrencyForm!: FormGroup; // Add the definite assignment assertion

  creationData = {
    currencyName: "",
    currencyMemo: "",
    symbol: "",
    value: 0,
  };

  deletionData = {
    currencyId: 0,
  };

  createSuccessMessageVisible = false;
  deleteSuccessMessageVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.currencyForm = this.formBuilder.group({
      currencyName: ['', Validators.required],
      currencyMemo: ['', Validators.required],
      symbol: ['', Validators.required],
      value: [0, Validators.required],
    });

    this.deleteCurrencyForm = this.formBuilder.group({
      currencyName: ['', Validators.required],
    });
  }

  onCreateSubmit() {
    if (this.currencyForm.invalid) {
      return;
    }

    this.currencyService.createCurrency(this.creationData).subscribe({
      next: (response) => {
        console.log('Currency created successfully:', response);
        this.showCreateSuccessMessage();
        this.refreshPageAfterDelay();
      },
      error: (error) => {
        console.error('Error creating currency:', error);
        // Handle error - display an error message or perform other actions
      }
    });
  }

  onDeleteSubmit() {
    if (this.deleteCurrencyForm.invalid) {
      return;
    }
    
    this.currencyService.deleteCurrency(this.deletionData.currencyId).subscribe({
      next: (response) => {
        console.log('Currency deleted successfully:', response);
        this.showDeleteSuccessMessage();
        this.refreshPageAfterDelay();
      },
      error: (error) => {
        console.error('Error deleting currency:', error);
        // Handle error - display an error message or perform other actions
      }
    });
  }

  showCreateSuccessMessage() {
    this.createSuccessMessageVisible = true;
    setTimeout(() => {
      this.createSuccessMessageVisible = false;
    }, 5000); // Hide the success message after 5 seconds
  }

  showDeleteSuccessMessage() {
    this.deleteSuccessMessageVisible = true;
    setTimeout(() => {
      this.deleteSuccessMessageVisible = false;
    }, 5000); // Hide the success message after 5 seconds
  }

  refreshPageAfterDelay() {
    setTimeout(() => {
      location.reload();
    }, 2000); // Refresh the page after 2 seconds
  }
}
