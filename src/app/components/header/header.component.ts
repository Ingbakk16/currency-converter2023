import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/User'; // Assuming you have a User interface defined

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(SidebarComponent, { static: false }) sidebarComponent!: SidebarComponent;
  user$: Observable<User> | undefined;
  isPremiumUser$: Observable<boolean> | undefined;
  remainingConversions$: Observable<number> | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  
  fetchUserDetails(): void {
    if (this.authService.isLoggedIn()) {
      const userIdString = this.authService.getUserIdFromToken(); // Assuming getUserIdFromToken returns a string or null
      if (userIdString !== null) { // Check if userIdString is not null
        const userId = parseInt(userIdString, 10); // Convert the string to a number
        if (!isNaN(userId)) { // Check if the conversion was successful
          const user$ = this.userService.getUserById(userId);
          this.isPremiumUser$ = user$.pipe(map(user => user.remainingConversions === -1));
          this.remainingConversions$ = user$.pipe(map(user => user.remainingConversions));
        }
      }
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleSidebar() {
    if (this.sidebarComponent) {
      this.sidebarComponent.toggleSidebar();
    }
  }
}
