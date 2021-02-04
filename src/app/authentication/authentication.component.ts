import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { SharedServiceService } from '../shared-service.service';
import { User } from './user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder:FormBuilder,private service:AuthenticationService,private router:Router) { 
    this.form = this.formBuilder.group({
     username: [''],
     password: ['']
    })
  }
  
  ngOnInit(): void {
  }
  login():void{
    
      this.service.login(this.form.value).subscribe(res => {
        console.log('User is login!')
        this.router.navigate(['/postt'])
      })

  }
}
