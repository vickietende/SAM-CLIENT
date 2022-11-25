import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sam-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  type: string="password";
  isText: boolean=false;
  eyeIcon:string="fa-eye-slash";
  

  constructor() { }

  ngOnInit(): void {
  }

  hideShowPass(){
    this.isText=!this.isText
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type="password";

  }

}
