import { Component } from '@angular/core';
import { GitHubService } from '../services/github.service';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'github',
  templateUrl: 'github.component.html',
  styleUrls: ['github.component.css'],
  providers: [GitHubService]  
})
export class GitHubComponent {
  title = 'Git Hub Sub Component';
  user:any;
  repos:any;
  username:any;
  userslist: Observable<string[]>;

  constructor(private _githubService:GitHubService){
      this.user = false;
      this.userslist = null;
  }

  getUserDetails(){
      this._githubService.getUser().subscribe(user => {
          this.user = user;
      })
      this._githubService.getRepos().subscribe(repos => {
          this.repos = repos;
      })
  }

  searchUser(){
        this._githubService.updateUser(this.username);
        this.getUserDetails();
  }

  userUpdated(user) {
        this.username = user;
        this.searchUser();
  }
}
