import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/services/shared.service';
import {UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public userservice:UserService,public router:Router,public appcomponent:AppComponent,private sharedservice:SharedService) { }
  public running:boolean=false; 
  ngOnInit(): void {
  }
  login(username:string,password:string){
    this.running=true
    this.userservice.user_login(username,password).subscribe((data)=>{
      if (data.status == true){
        this.sharedservice.userkey=username
      }
      alert(data.msg)
      this.appcomponent.ngOnInit()
      this.running=false
    })
  }

}
