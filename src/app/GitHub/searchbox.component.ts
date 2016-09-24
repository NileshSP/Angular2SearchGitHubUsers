import {Component, Pipe, PipeTransform } from '@angular/core';
import {GitHubService } from '../services/github.service';
import {KeysPipe } from './keyvalues.pipe';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'search-box',
  template: `
    <div>
      <input type="text" />
      <ul>
        <li *ngFor="let item of items | async">{{item}}</li>
      </ul>
    </div>
  `,
    providers: [GitHubService]
})

export class SearchBoxComponent {
  items: Observable<Array<string>>;
  term = new FormControl();
  constructor(private _githubService: GitHubService) {
    this.items = this._githubService.searchUsers(this.term.valueChanges);
  }

}

