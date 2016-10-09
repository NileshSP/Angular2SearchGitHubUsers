import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp, URLSearchParams, Response } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()
export class GitHubService {
  private username = '';
  constructor(private _http:Http, private jsonp: Jsonp){
      // console.log('GitHub service started.....');
  }  

  searchUsers(searchUser: string): Observable<any>{
    return this._http.get('https://api.github.com/search/users?q='+searchUser+'%20in:fullname')//&per_page=5
        .map(res => res.json())
 }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

  getUser(){
    return this._http.get('https://api.github.com/users/'+this.username)
        .map(res => res.json());
  }

  getRepos(){
    return this._http.get('https://api.github.com/users/'+this.username+'/repos')
        .map(res => res.json());
  }

  updateUser(user){
    this.username = user;
  }
} 