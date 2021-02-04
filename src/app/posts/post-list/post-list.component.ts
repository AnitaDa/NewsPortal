import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
  constructor(private route:ActivatedRoute ,private service:SharedServiceService) { }

  ngOnInit(): void {
    
    this.service.get("Post")
    .subscribe((data:Post[])=>{
      this.posts=data;
    })
  }
  searchData(value:string){
    this.service.get("Post",value)
    .subscribe((data:Post[])=>{
      this.posts=data;
    })
  }
 getPost(postId:number){
  this.service.getById("Post",postId)
  .subscribe(data=>
   this.post=data
   )
   console.log(this.post);
  }
}

