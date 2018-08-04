import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userinfo:Object

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.userinfo = {
        userid:'123321',
        username:'慕女神'
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
