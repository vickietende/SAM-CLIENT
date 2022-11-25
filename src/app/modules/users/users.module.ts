import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
