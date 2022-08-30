import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Result } from '../models/Result';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userkey:string='';
  public readonly base_url:string="https://localhost:44353"
  public userdata:User=new User();
  constructor() { }

  processError(err:any): Result{
    return new Result(err.message,false)
  }
}
