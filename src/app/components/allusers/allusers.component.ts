import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  public users:User[]=[];
  
  constructor(private userservice:UserService,private sharedservice:SharedService) { }

  ngOnInit(): void {
    this.userservice.all_users().subscribe(data=>this.users=data)
  }
  user_check(username:string){
    if(username!=this.sharedservice.userkey){
      return true
    }
    else{
      return false
    }
  }
  user_search(){
    var username=prompt('write complete or partial username')
    if(username!=null){
      this.userservice.users_search(username).subscribe((data)=>{
        this.users=data
      })
    }
  }

}
