export class Post {
    public constructor(
       public postId:number,
       public title:string,
      public  postDate:Date,
       public content:string,
       public author:string,
       public administratorId:number
    ){}
}
