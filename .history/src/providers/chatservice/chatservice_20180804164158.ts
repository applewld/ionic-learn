import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http) {
    // console.log('Hello ChatserviceProvider Provider');
  }

}
