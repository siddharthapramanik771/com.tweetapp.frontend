import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Result } from '../models/Result';
import { Password, User } from '../models/user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url:string=""
  constructor(private http:HttpClient,private sharedservice:SharedService) {
    this._url = this.sharedservice.base_url+'/api/v1.0/tweets/';
   }

  user_login(username:string,password:string):Observable<Result>{
    const parameters = new HttpParams().appendAll({"username":username,"password":password});
    return this.http.get<Result>(this._url+'login', { params: parameters}).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
  user_logout(){
    this.sharedservice.userkey='';
  }
  user_register(user:User){
    return this.http.post<Result>(this._url+'register',user).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
  all_users(){
    return this.http.get<User[]>(this._url+'users/all')
  }
  users_search(username:string){
    return this.http.get<User[]>(this.sharedservice.base_url+'/api/v/1.0/tweets/user/search/'+username)
  }
  change_password(username:string,password:string){
    var _password=new Password(password)
    return this.http.put<Result>(this._url+username+'/forgot',_password).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }

}
