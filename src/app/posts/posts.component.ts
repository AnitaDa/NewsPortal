import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { Post } from './post';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post:Post | any;
  constructor(private route:ActivatedRoute,private service:SharedServiceService) { }

  ngOnInit(): void {
   const routeParams=this.route.snapshot.paramMap;
   const postIdFromRoute=Number(routeParams.get('post.postId'));
   this.service.getById("Post",postIdFromRoute)
   .subscribe(data=>
    this.post=data
    )
  }

}
