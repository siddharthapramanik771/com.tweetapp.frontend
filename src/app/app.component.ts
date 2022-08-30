import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'com.tweetapp';
  public logged_in:boolean=false;
  public selected:string='';
  constructor(private userservice:UserService,private router:Router,private sharedservice:SharedService) { }
  ngOnInit(): void {
    var user=this.sharedservice.userkey
    this.authenticate()
    if (user!=''){
      this.logged_in=true
    }
    else{
      this.logged_in=false
    }
  }
  logout(){
    this.userservice.user_logout()
    this.ngOnInit()
  }
  authenticate(){
    var user=this.sharedservice.userkey
    if (user!=null && user!=''){
      this.router.navigate(['dashboard'])
      this.selected='dashboard'
    }
    else{
      this.selected='login'
      console.log(this.selected)
      this.router.navigate(['login'])
    }
  }

}
