import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';

import { SharedServiceService } from './shared-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PostAddEditComponent } from './posts/post-add-edit/post-add-edit.component';
import { BasicAuthInterceptor } from './helper/basic-auth.interceptor';
import { FilterPipe } from './filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DateFormatPipe } from './date-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    AuthenticationComponent,
    PostAddEditComponent,
    FilterPipe,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [SharedServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
