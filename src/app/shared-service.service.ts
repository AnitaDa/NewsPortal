import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Post } from './posts/post';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  url="https://localhost:5001/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}
  constructor(private http:HttpClient) { }

  get(controller:string,adminId?:number):Observable<Post[]>{
    if(adminId!=0){
      return this.http.get<Post[]>(this.url+controller+'?administratorId='+ adminId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }
    else{
      return this.http.get<Post[]>(this.url+controller)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
    }
  }
  gtid(controller:string,Id:number): Observable<any> {
    return this.http.get<any>(this.url+controller+'/'+Id)
    .pipe(
      catchError(this.errorHandler)
    )}
  add(obj:any,controller:string): Observable<Post> {
      return this.http.post<Post>(this.url+controller+'/', JSON.stringify(obj), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
     console.log(obj);
  }
  addAdminPost(administratorId:number,postId:number,controller:string): Observable<Post> {
    return this.http.post<Post>(this.url+controller+"/AdminPost", {administratorId,postId})
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}
  delete(Id:number,controller:string){
    return this.http.delete<any>(this.url+controller+'/'+Id).pipe(
      tap(pp=>console.log('Delete with id=${Id}')),
    )
  }
  update(controller:string,Id: number, obj:any): Observable<Post> {
    return this.http.put<Post>(this.url+controller+'/' + Id, JSON.stringify(obj), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  
}

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
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
