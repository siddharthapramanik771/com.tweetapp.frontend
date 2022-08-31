import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Reply } from 'src/app/models/Reply';
import { Tweet } from 'src/app/models/tweet';
import { User } from 'src/app/models/user';
import { ReplyService } from 'src/app/services/reply.service';
import { SharedService } from 'src/app/services/shared.service';
import { TweetService } from 'src/app/services/tweet.service';
import { TweetListComponent } from '../tweet-list/tweet-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public tweets:Tweet[]=[];
  public running:boolean=false;
  public replys:[string,Reply[]]=['',[]];
  constructor(private tweetservice:TweetService,public sharedservice:SharedService,
    private appcomponent:AppComponent,private replyservice:ReplyService,private router:Router) { }

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
  reply_tweet(id:string){
    var user=this.sharedservice.userkey
      if(user!=''){
        var msg=prompt('write your reply here')
        if(msg!=null && msg!=''){
          this.running=true
          this.replyservice.reply(user,id,msg).subscribe((data)=>{
            if(data.status == true){
              this.get_reply(id)
            }
            alert(data.msg)
            this.running=false
          })
        }
        else{
          alert('please write something')
        }
      }
      else{
          alert('Please log in to reply')
          this.appcomponent.selected='login'
          this.router.navigate(['login'])
      }
  }
  get_reply(id:string){
    this.replyservice.get_replys(id).subscribe((data)=>{
      this.replys=[id,data]
      console.log(this.replys[0])
      console.log(this.replys[1])
    })
  }
  check(id:string){
    if(this.replys[0]==id){
      return true
    }
    return false
  }

}
