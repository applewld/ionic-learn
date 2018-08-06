import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-userdatalist',
  templateUrl: 'userdatalist.html',
})
export class UserdatalistPage {
  dataType:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.dataType = navParams.get('dataType');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdatalistPage');
  }

}
