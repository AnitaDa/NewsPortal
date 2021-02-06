import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private service:AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if(currentUser&&currentUser.authdata){
      request=request.clone({
        setHeaders:{
          Authorization:'Basic${currentUser.authdata}'
        }
      });
    }
    return next.handle(request);
  }
}
