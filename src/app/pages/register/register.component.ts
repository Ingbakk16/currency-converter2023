import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  authService = inject(AuthService)
  router = inject(Router);
  errorRegister: WritableSignal<boolean> = signal(false)
  cargando = signal(false);

  registerData: UserForRegistrationDto = {
    UserName: "",
    Email: "",
    FirstName: "",
    LastName: "",
    Password: "",
  }

  async register(){
    this.errorRegister.set(false);
    this.cargando.set(true);
    try{
      const res = await this.authService.register(this.registerData);
      if(res.ok) {
        this.router.navigate(["/login"])
      }
      else {
        this.errorRegister.set(true);
      }
    } catch(err) {
      console.warn('Error registrando', err)
    }
    this.cargando.set(false);
  }

}
