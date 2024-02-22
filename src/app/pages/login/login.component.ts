import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequestDto} from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router);
  errorLogin = signal(false);
  cargando = signal(false);

  loginData: AuthenticationRequestDto = {
    username: '',
    password: ''
  };

  login(){
    this.errorLogin.set(false);
    this.cargando.set(true);
    this.authService.login(this.loginData).then(res => {
      if(res) this.router.navigate(["/main"]);
      else {
        this.errorLogin.set(true)
      };
      this.cargando.set(false);
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
