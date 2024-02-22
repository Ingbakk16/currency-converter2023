import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { userNotLoggedGuard } from './guards/user-not-logged.guard';
import { loggedUserGuard } from './guards/logged-user.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path:"home",
    canActivate: [userNotLoggedGuard],
    loadChildren: ()=> import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path:"register",
    canActivate: [userNotLoggedGuard],
    loadChildren: ()=> import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path:"login",
    canActivate: [userNotLoggedGuard],
    loadChildren: ()=> import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path:"main",
    canActivate: [loggedUserGuard],
    loadChildren: ()=> import('./pages/main/main.module').then(m => m.MainModule)
  },

  {
    path:"currency-management",
    canActivate: [adminGuard],
    loadChildren: ()=> import('./pages/currency-management/currency-management.module').then(m => m.CurrencyManagementModule)
  },

  {
    path:"**",
    loadChildren: ()=> import('./pages/error/error.module').then(m => m.ErrorModule)
  },

  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
