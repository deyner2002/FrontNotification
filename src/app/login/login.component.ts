import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {AccountService} from '../services/account/account.service';
declare var jwt_decode: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  showLogin = true;
  showRegister= false;

  loginForm=this.formBuilder.group({
    email:['', [Validators.required,Validators.email]],
    password:['', Validators.required]
  })

  registerForm=this.formBuilder.group({
    email:['', [Validators.required,Validators.email]],
    password:['', Validators.required],
    accountType:['', Validators.required],
  })
  constructor(private formBuilder:FormBuilder, 
              private router:Router, 
              private authenticationService: AuthenticationService, 
              private accountService: AccountService ) { }

  ngOnInit(): void {
    this.showLogin = true;
    this.showRegister = false;
    this.authenticationService.logout();
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  get emailR(){
    return this.registerForm.controls.email;
  }

  get passwordR(){
    return this.registerForm.controls.password;
  }

  get accountTypeR(){
    return this.registerForm.controls.accountType;
  }

  openRegister(event: MouseEvent){
    this.showLogin = false;
    this.showRegister = true;
    event.preventDefault();
  }

  openLogin(event: MouseEvent){
    this.showLogin = true;
    this.showRegister = false;
    event.preventDefault();
  }

  login(){
    const credentials = {
      email: this.loginForm.value.email+"",
      password: this.loginForm.value.password+""
    };
    this.authenticationService.login(credentials).subscribe(
      response => {
        localStorage.setItem('userId', response);
        this.accountService.GetUserAccount(response).subscribe(
          (data) => {
            this.accountService.saveUserData(data); 
          },
          (error) => {
            console.error('Error al obtener los datos del usuario:', error);
          }
        );
        this.router.navigateByUrl('dashboard');
      this.loginForm.reset();
      },
      error => {
        console.error('Failed to login:', error);
        this.loginForm.markAllAsTouched();
        alert("Error when entering data")
      }
    );
  }

  register(){
    const credentials = {
      email: this.registerForm.value.email+"",
      password: this.registerForm.value.password+""
    };
    this.authenticationService.register(credentials).subscribe(
      response => {
        this.accountService.saveUserAccount(response,""+this.registerForm.value.accountType).subscribe();
      this.registerForm.reset();
      alert("You are now part of the notifications Service ! :)")
      this.showLogin = true;
      this.showRegister = false;
      },
      error => {
        this.registerForm.markAllAsTouched();
        alert("Error registering user")
      }
    );
  }
}
