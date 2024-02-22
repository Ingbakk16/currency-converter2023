import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy{

  isSidebarOpen: boolean = false;
  isPremiumUser: boolean = false; 
  userSubscription: Subscription | undefined;
  isUserAdmin: boolean = false; // Add this property

  constructor(private authService: AuthService, private userService: UserServiceService, private dialog: MatDialog) {}


  ngOnInit() {
    this.checkPremiumUser();
    this.checkAdmin();
    
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }



  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    
  }

  logout() {
    this.authService.logOut();
    setTimeout(() => {
      window.location.reload();
    },1500);
    
  }

  


upgradeToPremium() {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed the upgrade
      const userIdString = this.authService.getUserIdFromToken(); // Fetch the userId as a string
      if (!userIdString) {
        console.error('UserId is not available.');
        return;
      }
    
      const userId = parseInt(userIdString, 10); // Convert the userId string to a number
      if (isNaN(userId)) {
        console.error('Invalid userId.');
        return;
      }
    
      this.userService.upgradeToPremium(userId)
        .subscribe(
          {
            next: () => {
              console.log('User upgraded to premium successfully');
              // Optionally, you can show a success message or perform any other action
              
              // Show the confirmation message in the dialog component
              dialogRef.componentInstance.showConfirmationMessage = true;
              
              // Refresh the page after 3 seconds
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            },
            error: (error) => {
              console.error('Error upgrading user to premium:', error);
              // Handle error - display an error message or perform other actions
            }
          }
        );
    }
  });
}


  private checkPremiumUser() {
    if (this.authService.isLoggedIn()) {
      const userIdString = this.authService.getUserIdFromToken();
      if (userIdString !== null) {
        const userId = parseInt(userIdString, 10);
        if (!isNaN(userId)) {
          this.userSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
              this.isPremiumUser = (user.remainingConversions === -1);
            },
            error: (error) => {
              console.error('Error fetching user details:', error);
            }
          });
        }
      }
    }
  }


  private checkAdmin() {
    if (this.authService.isLoggedIn()) {
      const userIdString = this.authService.getUserIdFromToken();
      if (userIdString !== null) {
        const userId = parseInt(userIdString, 10);
        if (!isNaN(userId)) {
          this.userSubscription = this.userService.getUserById(userId).subscribe({
            next: (user) => {
              this.isUserAdmin = (user.role === 0); // Update the isUserAdmin property based on the user's role
            },
            error: (error) => {
              console.error('Error fetching user details:', error);
            }
          });
        }
      }
    }

}

}
