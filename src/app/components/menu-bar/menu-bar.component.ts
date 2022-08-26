import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  public logged_in:boolean=false;
  constructor(public userservice:UserService,public router:Router) { }

  ngOnInit(): void {
    var user=localStorage.getItem('user')
    if (user!=null){
      this.logged_in=true
    }
  }
  logout(){
    this.userservice.user_logout()
    window.location.reload()
    this.router.navigate(['login'])
  }

}
