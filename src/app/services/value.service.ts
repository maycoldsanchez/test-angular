import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value: string = 'myValue'
  constructor() { }

  getValue() { return this.value; }

  setValue(value: string) { this.value = value; }

  getPromiseValue() { return Promise.resolve('Promise Value'); }

  getObservableValue() { return of('Observable Value') }
}
