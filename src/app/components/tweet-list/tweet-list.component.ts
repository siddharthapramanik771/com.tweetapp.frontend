import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Tweet } from 'src/app/models/tweet';
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
  constructor(public tweetservice:TweetService,private sharedservice:SharedService,public router:Router,private appcomponent:AppComponent) { 
    if(sharedservice.userkey!=''){
      this.logged_in=true
    }
    else{
      this.logged_in=false
    }
  }

  ngOnInit(): void {
    this.tweetservice.all_tweets().subscribe(data=>this.tweets=data)
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
  like_check(users_liked:string[]){
    if(users_liked.includes(this.sharedservice.userkey)){
      return true
    }
    else{
      return false
    }
  }
  user_check(tweet_username:string){
    var user=this.sharedservice.userkey
    if(user!=tweet_username){
      return true
    }
    else{
      return false
    }
  }

}
