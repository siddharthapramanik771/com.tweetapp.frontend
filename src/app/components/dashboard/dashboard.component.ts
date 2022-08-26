import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { SharedService } from 'src/app/services/shared.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public tweets:Tweet[]=[];
  public running:boolean=false;
  public running1:boolean=false;
  constructor(public tweetservice:TweetService,private sharedservice:SharedService) { }

  ngOnInit(): void {
    const user=this.sharedservice.userkey
    if(user!=''){
      this.tweetservice.get_tweets_by_user(user).subscribe(data=>this.tweets=data)
    }
  }
  post_tweet(msg:string){
    console.log('component_'+msg)
    this.running=true
    var username=this.sharedservice.userkey
    if(username!=''){
      this.tweetservice.post_tweet(msg,username).subscribe((data)=>{
        if(data.status==true){
          alert(data.msg)
          this.ngOnInit()
        }
        else{
          alert(data)
        }
        this.running=false
      })
    }
    else{
      this.running=false
    }
  }
  edit_tweet(id:string){
    // console.log('component_'+msg)
    var msg=prompt("enter the new msg")
    this.running=true
    var username=this.sharedservice.userkey
    if(username!='' && msg!=null){
      this.tweetservice.edit_tweet(msg,id,username).subscribe((data)=>{
        if(data.status==true){
          alert(data.msg)
          this.ngOnInit()
        }
        else{
          alert(data.msg)
        }
        this.running=false
      })
    }
    else{
      this.running=false
    }
  }
  delete_tweet(id:string){
    this.running=true
    var username=this.sharedservice.userkey
    if(username!=''){
      this.tweetservice.delete_tweet(id,username).subscribe((data)=>{
        if(data.status==true){
          alert(data.msg)
          this.ngOnInit()
        }
        else{
          alert(data.msg)
        }
        this.running=false
      })
    }
    else{
      this.running=false
    }
  }

}
