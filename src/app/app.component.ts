import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'com.tweetapp';
  public logged_in:boolean=false;
  constructor(public userservice:UserService,public router:Router) { }

  ngOnInit(): void {
    var user=localStorage.getItem('user')
    if (user!=null){
      this.logged_in=true
    }
    else{
      this.logged_in=false
    }
    this.authenticate()
  }
  logout(){
    this.userservice.user_logout()
    this.ngOnInit()
  }
  authenticate(){
    var user=localStorage.getItem('user')
    if (user!=null && user!=''){
      console.log('hi')
      this.router.navigate(['dashboard'])
    }
    else{
      console.log('login')
      this.router.navigate(['login'])
      
    }
  }

}
