import { Injectable } from '@angular/core';
import { ValueService } from './value.service';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private ValueService: ValueService) { }

  getValue() {
    return this.ValueService.getValue();
  }
}
