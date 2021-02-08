import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { AuthenticationService } from '../authentication.service';
import { Post } from '../posts/post';
import { SharedServiceService } from '../shared-service.service';
import { User } from './user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;
  loginUser:User|any;
  public administratorId:number;
  constructor(private formBuilder:FormBuilder,private service:AuthenticationService,private router:Router) { 
    this.form = this.formBuilder.group({
     username: [''],
     password: ['']
    })
  }
  get formFields() { return this.form.controls; }
  ngOnInit(): void {
  }
  login(){
    this.service.login(this.form.value)
    .subscribe((data:User)=>{
      this.loginUser=data,
      this.administratorId=data.administratorId
    }
    )
    window.location.reload();
  }
  isLogged(): boolean{
    if (JSON.parse(localStorage.getItem('currentUser')!) != null){
      return true;
    }
    return false;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}