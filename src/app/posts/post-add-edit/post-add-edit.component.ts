import { DatePipe } from '@angular/common';
import { isDecoratorIdentifier } from '@angular/compiler-cli/src/ngtsc/reflection';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { AuthenticationComponent } from 'src/app/authentication/authentication.component';
import { User } from 'src/app/authentication/user';
import { SharedServiceService } from 'src/app/shared-service.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.css']
})
export class PostAddEditComponent implements OnInit {
  form: FormGroup;
  
  currentDate = new Date();
  @Input() post:Post;
  @Input()  edit:boolean;
   newPost:Post;
   administratorId:number;
   currentUser:User;
  constructor(private formBuilder: FormBuilder,private service:SharedServiceService,private router:Router) {
    this.resetForm();
   }
   resetForm(){
    
    this.form = this.formBuilder.group({
      postId:0,
      title:[''],
      content:[''],
      postDate:null
    })}

  ngOnInit(): void {
  this.currentUser= JSON.parse(localStorage.getItem('currentUser')!);
  console.log(this.currentUser.userName);
  console.log(this.post);
  }
  
  addAdminPost(){
    this.service.addAdminPost(this.currentUser.administratorId,this.newPost.postId,"Post").subscribe(res=>{
      window.alert('AdminPost created!');
   })
  }
  isEdit(){
    if(this.edit)
    return true;
    return false;
  }
  isLogged(): boolean{
    if (JSON.parse(localStorage.getItem('currentUser')!) != null){
      return true;
    }
    return false;
  }
  get formFields() { return this.form.controls; }
  submitForm(){
    this.form.patchValue({
      postDate:this.currentDate
    });
    
    //dodavanje posta
    this.service.add(this.form.value,"Post").subscribe((res:Post) => {
      this.newPost=res,
      window.alert('Post created!');
      this.addAdminPost();
      this.resetForm();
      window.location.reload();
    })}
}

