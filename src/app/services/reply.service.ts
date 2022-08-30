import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Reply } from '../models/Reply';
import { Result } from '../models/Result';
import { Msg } from '../models/tweet';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private _url:string = '';
  constructor(private http:HttpClient,private sharedservice:SharedService) {
    this._url = this.sharedservice.base_url+'/api/v1.0/tweets/';
   }
   reply(username:string,id:string,msg:string){
    var msg_data:Msg=new Msg(msg)
    return this.http.post<Result>(this._url+username+'/reply/'+id,msg_data).pipe(catchError(async (err) => this.sharedservice.processError(err)))
   }
   get_replys(id:string){
    return this.http.get<Reply[]>(this._url+id+'/replys')
   }
}
