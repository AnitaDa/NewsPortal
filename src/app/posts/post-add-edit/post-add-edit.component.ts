import { DatePipe } from '@angular/common';
import { isDecoratorIdentifier } from '@angular/compiler-cli/src/ngtsc/reflection';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  //@Input() post:Post;

   newPost:Post;
   editPost:Post;
   administratorId:number;
   currentUser:User;
   postId:number;
   title:string;
   content:string;
  constructor(private formBuilder: FormBuilder,private service:SharedServiceService,private router:Router,private route: ActivatedRoute) {
    this.title = 'title';
    this.content = 'content';
   }
  ngOnInit(): void {
    this.resetForm();
  this.currentUser= JSON.parse(localStorage.getItem('currentUser')!);
 const routeParams = this.route.snapshot.paramMap;
  const postIdFromRoute = Number(routeParams.get('Id'));
  this.postId=this.route.snapshot.params['Id'];
  this.fillForm();
  }
  fillForm(){
    console.log(this.postId);
  this.service.gtid("Post",this.postId).subscribe(data=>{
    this.editPost=data;
    this.form.controls[this.title].setValue(this.editPost.title),
  this.form.controls[this.content].setValue(this.editPost.content);
  })
 
  }
  resetForm(){
    this.form = this.formBuilder.group({
      postId:0,
      title:[''],
      content:[''],
      postDate:null
    })
  }
  
  addAdminPost(){
    if(this.postId>0){
      this.service.addAdminPost(this.currentUser.administratorId,this.postId,"Post").subscribe(res=>{
        window.alert('AdminPost created!');
     })
    }
    else{
    this.service.addAdminPost(this.currentUser.administratorId,this.newPost.postId,"Post").subscribe(res=>{
      window.alert('AdminPost created!');
   })}
  }
  
  isLogged(): boolean{
    if (JSON.parse(localStorage.getItem('currentUser')!) != null){
      return true;
    }
    return false;
  }
  get formFields() { return this.form.controls; }
  
  submitForm(){
    //let post: Post = {
      //postId:this.postId,
      //title:this.form.get(this.title)?.value,
      //content: this.form.get(this.content)?.value,
      //postDate:this.currentDate,
      //author:'',
      //administratorId:this.currentUser.administratorId
    //};
   
    
    //editovanje
    if(this.postId>0){
      console.log(post)
      this.form.patchValue({
        postId:this.postId
      });
      this.service.update(post,"Post",this.postId).subscribe((res:Post) => {
        this.newPost=res,
        window.alert('Post update!');
        this.addAdminPost();
        this.resetForm();
        window.location.reload();
      })
    }
    else{    //dodavanje posta
      this.form.patchValue({
        postDate:this.currentDate
      });
    this.service.add(this.form.value,"Post").subscribe((res:Post) => {
      this.newPost=res,
      window.alert('Post created!');
      this.addAdminPost();
      this.resetForm();
      window.location.reload();
    })
  }
  }
}

