import { Component } from '@angular/core';

/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html'
})
export class EmojipickerComponent {

  text: string;

  constructor() {
    console.log('Hello EmojipickerComponent Component');
    this.text = 'Hello World';
  }

}
