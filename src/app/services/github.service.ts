import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp, URLSearchParams, Response } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()
export class GitHubService {
  private username = 'bradtraversy';
  constructor(private _http:Http, private jsonp: Jsonp){
      console.log('GitHub service started.....');
  }  

  searchUsers(terms: Observable<string>, debounceDuration = 400){
    // let githubUrl = 'https://api.github.com/users/';
    // // let params = new URLSearchParams();
    // // params.set('search', searchterm); // the user's search value
    // // params.set('action', 'opensearch');
    // // params.set('format', 'json');
    // // params.set('callback', 'JSONP_CALLBACK');

    // // return this.jsonp // for JSONP..
    // //           .get(githubUrl + searchterm)
    // //           .map(request => <string[]> request.json()[1]);

    // return this._http
    //           .get(githubUrl + searchterm + "?since=135")
    //           //.subscribe(this.extractData, err => console.log(err));
    //           //.catch(this.handleError);
    //           .map(res => res.json());
           
  
    return terms.debounceTime(debounceDuration)
                .distinctUntilChanged()
                .switchMap(term => this.rawSearch(term));
 }

 rawSearch (term: string) {
    let githubUrl = 'https://api.github.com/users/';
    // let params = new URLSearchParams();
    // params.set('search', searchterm); // the user's search value
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');

    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term + "?since=135");
    search.set('format', 'json');
    return this.jsonp
                .get(githubUrl, { search })
                .map((request) => request.json()[1]);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getUser(){
    //var myArr = JSON.parse(xmlhttp.responseText);
    //myFunction(myArr);
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