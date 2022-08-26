import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Result } from '../models/Result';
import { Msg, Tweet } from '../models/tweet';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private _url:string = '';
  constructor(public http:HttpClient,private sharedservice:SharedService) {
    this._url = this.sharedservice.base_url+'/api/v1.0/tweets/';
   }
  get_tweets_by_user(user:string){
    const parameters = new HttpParams().append("username",user)
    return this.http.get<Tweet[]>(this._url+user, { params: parameters})
  }
  all_tweets(){
    return this.http.get<Tweet[]>(this._url+'all')
  }
  post_tweet(msg:string,username:string){
    console.log(msg)
    var tweet:Msg=new Msg(msg)
    return this.http.post<Result>(this._url+username+'/add',tweet).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
  edit_tweet(msg:string,id:string,username:string){
    var msg_data:Msg=new Msg(msg)
    return this.http.put<Result>(this._url+username+'/update/'+id,msg_data).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
  delete_tweet(id:string,username:string){
    return this.http.delete<Result>(this._url+username+'/delete/'+id).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
  like_tweet(id:string,username:string){
    return this.http.put<Result>(this._url+username+'/like/'+id,null).pipe(catchError(async (err) => this.sharedservice.processError(err)))
  }
}
