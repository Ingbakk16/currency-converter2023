// Modify the interface in your Angular frontend to match the backend DTOs
export interface UserForRegistrationDto {
    UserName: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
}

export interface AuthenticationRequestDto {
    username: string;
    password: string;
}


export interface User {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    state: State; // Assuming State is an enum in your backend
    role: Role; // Assuming Role is an enum in your backend
    subscriptionType: SubscriptionType; // Assuming SubscriptionType is an enum in your backend
    remainingConversions: number;
     
  }


 enum State {
    Active = 'Active',
    Inactive = 'Inactive',
  }
  
   enum Role {
    User = 1,
    Admin = 0,
  }

enum SubscriptionType {
    Free = 0,
    Premium = 1,
    // Add other subscription types as needed
  }