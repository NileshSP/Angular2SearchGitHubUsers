import {Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValues'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
        alert(value[key]);
      keys.push({key: key, value: value[key]});
        // for (let key1 in value[key]) {
        // keys.push({key1: key1, value: value[key1]});
        // }
    }
    return keys;
  }
}