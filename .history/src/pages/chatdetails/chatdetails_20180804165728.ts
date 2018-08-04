import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';

@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;
  isOpenEmojiPicker: boolean;
  chatMessage:ChatMessage[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatserviceProvider) {
    this.chatUserName = navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatdetailsPage');
  }

  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  getMessages() {
      return this.chatService.getMessageList()
      .then(res=>{
          this.chatMessage = res;
      })
  }

}
