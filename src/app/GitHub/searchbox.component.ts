import {Component, Pipe, PipeTransform, EventEmitter, Output } from '@angular/core';
import {GitHubService } from '../services/github.service';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'search-box',
  templateUrl:'searchbox.component.html',
  providers: [GitHubService]
})

export class SearchBoxComponent {
  @Output() userUpdated: EventEmitter<string> = new EventEmitter<string>(); 
  
  term = new FormControl();
  users: Array<any>;

  constructor(private _githubService: GitHubService) {
  }

  ngOnInit(){
      this.term.valueChanges
                  .debounceTime(300)
                  .do(val => this.users = null)
                  .filter(val => val !== '')
                  .switchMap(term => 
                                    this._githubService.searchUsers(term)
                                          .catch(err => this.handleError(err))
                            )
                  .subscribe((result) => {
                                    console.log(result);
                                    this.users = <Array<any>>result.items
                  });
  }

  onClick(user: string) {
    //this.term.setValue(user);
    this.userUpdated.emit(user);
  }

  handleError(error: any)
  {
    let errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Unexpected Error`;
    console.log(errorMessage);
    return Observable.empty();
  }
}