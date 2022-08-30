import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private userservice:UserService,private router:Router,private appcomponent:AppComponent,private shareservice:SharedService) { }
  public running:boolean=false;
  ngOnInit(): void {
  }
  register(first_name:string,last_name:string,email:string,number:string,username:string,password:string,confirm_password:string){
    if(password!=confirm_password){
      alert("password and confirm password should be same")
    }
    else{
      const user:User = new User(first_name,last_name,username,email,password,number)
      console.log(user)
      this.running=true
      this.userservice.user_register(user).subscribe((data)=>{
        if(data.status == true){
          this.shareservice.userkey=username
          this.appcomponent.ngOnInit()
        }
        else{
          alert(data.msg)
        }
        this.running=false
      })
    }
  }
}
