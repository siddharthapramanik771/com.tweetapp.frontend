import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public userdata:User=new User();
  constructor(private sharedservice:SharedService,private userservice:UserService) { }

  ngOnInit(): void {
    this.userdata=this.sharedservice.userdata
    console.log(this.userdata)
  }
  change_password(){
    var password=prompt('enter password')
    if(password!=null && password!=''){
      this.userservice.change_password(this.sharedservice.userkey,password).subscribe((data)=>{
        alert(data.msg)
      })
    }
  }
}
