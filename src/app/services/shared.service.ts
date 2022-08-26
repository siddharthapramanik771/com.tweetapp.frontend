import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userkey:string='';
  public readonly base_url:string="https://localhost:44353"
  constructor() { }

  processError(err:any): Result{
    return new Result(err.message,false)
  }
}
