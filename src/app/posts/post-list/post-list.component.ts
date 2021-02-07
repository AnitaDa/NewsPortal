import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/authentication/user';
import { SharedServiceService } from 'src/app/shared-service.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  post:Post|any;
  form: FormGroup;
  currentUser:User;
  searchTerm:string;
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute ,private service:SharedServiceService) { 
  }
  ngOnInit(): void {
   this.getAllPost(0);
    this.currentUser= JSON.parse(localStorage.getItem('currentUser')!);
  }
  getAllPost(adminId:number){
  
    this.service.get("Post",adminId)
    .subscribe((data:Post[])=>{
      this.posts=data;
    })
  }

  isLogged(): boolean{
    if (JSON.parse(localStorage.getItem('currentUser')!) != null){
      return true;
    }
    return false;
  }
  deletePost(Id:number){
    console.log(Id);
    this.service.delete(Id,"Post").subscribe(pp=>{
      this.posts=this.posts.filter(f=>f.postId!==Id);
    });
  }
 getPost(postId:number){
  this.service.gtid("Post",postId)
  .subscribe(res=>{
    this.post=res;
  })

}

}
