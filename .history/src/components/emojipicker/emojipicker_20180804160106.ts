import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html'
})
export class EmojipickerComponent implements ControlValueAccessor {

  writeValue(obj: any): void{

  }
  registerOnChange(fn: any): void{

  }
  registerOnTouched(fn: any): void{

  }
  setDisabledState(isDisabled: boolean): void{

  }

  text: string;

  constructor() {
    console.log('Hello EmojipickerComponent Component');
    this.text = 'Hello World';
  }

}
