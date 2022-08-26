import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';

const routes: Routes = [
  { path:'',component: AppComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tweets', component: TweetListComponent },
  { path:'users', component: AllusersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,({
    onSameUrlNavigation: 'reload'
  }))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
