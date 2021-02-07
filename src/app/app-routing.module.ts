import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostAddEditComponent } from './posts/post-add-edit/post-add-edit.component';



import { PostListComponent } from './posts/post-list/post-list.component';


const routes: Routes = [
  {path:"", component:PostListComponent},
  {path:"listPost", component:PostListComponent},
   {path:'posts/:Id', component: PostAddEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
