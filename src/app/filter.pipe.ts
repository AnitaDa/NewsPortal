import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './posts/post';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], searchTerm:string): Post[] {
    if(!posts || !searchTerm){
      return posts;
    }
    return posts.filter(post=>
      post.title.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);  
      
  }

}
