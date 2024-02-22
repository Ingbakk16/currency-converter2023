import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private snackBar: MatSnackBar) {}
  showConfirmationMessage: boolean = false;


  confirm() {
    // Perform your action here
    
    // Show confirmation message
    this.snackBar.open('Action completed successfully!', 'Close', {
      duration: 3000, // Duration in milliseconds
    });
    
    // Close the dialog
    this.dialogRef.close(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  
  cancel() {
    // Close the dialog without performing the action
    this.dialogRef.close(false);
  }

}
