import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './authentication/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url="https://localhost:5001/api/User/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}
 
  constructor(private http: HttpClient) { }
   login(userr:any): Observable<any>{

    return this.http.post<any>(this.url+"Authenticate",JSON.stringify(userr), this.httpOptions)
    .pipe(map(user => {
      if (user){
        user.authdata = window.btoa(user.userName +':'+ user.password);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }));
  }
getLoggedUser(): Observable<User>{
  return this.http.get<User>(this.url+'GetLoggedUser')
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}
errorHandler(error:any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}   
}
