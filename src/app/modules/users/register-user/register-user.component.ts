import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sam-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

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
