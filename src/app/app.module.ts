import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GitHubComponent } from './GitHub/github.component';
import { SearchBoxComponent } from './GitHub/searchbox.component';

@NgModule({
  declarations: [
    AppComponent, GitHubComponent, SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
