import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Reply } from 'src/app/models/Reply';
import { Tweet } from 'src/app/models/tweet';
import { ReplyService } from 'src/app/services/reply.service';
import { SharedService } from 'src/app/services/shared.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
  public tweets:Tweet[]=[];
  public logged_in:boolean=false;
  public running:boolean=false
  public replys:[string,Reply[]]=['',[]];
  constructor(private tweetservice:TweetService,public sharedservice:SharedService,
    private router:Router,private appcomponent:AppComponent,private replyservice:ReplyService) { 
    if(sharedservice.userkey!=''){
      this.logged_in=true
    }
    else{
      this.logged_in=false
    }
  }

  ngOnInit(): void {
    this.tweetservice.all_tweets().subscribe(data=>this.tweets=data)
    this.replys=['',[]]
  }
  //methods related to like tweet
  like_check(users_liked:string[]){
    if(users_liked.includes(this.sharedservice.userkey)){
      return true
    }
    else{
      return false
    }
  }
  like_tweet(id:string){
    var user=this.sharedservice.userkey
    if(user!=''){
      this.running=true
      this.tweetservice.like_tweet(id,user).subscribe(data=>{
      if(data.status){
        this.ngOnInit()
      }
      alert(data.msg)
      this.running=false
      })
    }
    else{
      alert('Please log in to like')
      this.appcomponent.selected='login'
      this.router.navigate(['login'])
      
    }
  }

  //methods related to reply to a tweet 

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
  // checking to hide the user's own tweets
  user_check(tweet_username:string){
    var user=this.sharedservice.userkey
    if(user!=tweet_username){
      return true
    }
    else{
      return false
    }
  }
  check(id:string){
    if(this.replys[0]==id){
      return true
    }
    return false
  }

}
