import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";

import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private formBuild: FormBuilder, private loginService: LoginService) { }

  loginForm: FormGroup;

  ngOnInit() {

    this.loginForm = this.formBuild.group({
      email: [''],
      password: ['']
    })
  }

  loginMethod(email, password){
    this.loginService.login(email, password);
  }

}
