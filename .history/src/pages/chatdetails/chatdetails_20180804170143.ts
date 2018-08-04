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

  ionViewDidEnter(){
    this.getMessages()
    .then(()=>{
      this.scrollToBottom();
    })
  }

  scrollToBottom(): any {
   
  }

  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  /**
   *调用service里面的方法进行属性的赋值
   *
   * @returns
   * @memberof ChatdetailsPage
   */
  getMessages() {
      return this.chatService.getMessageList()
      .then(res=>{
          this.chatMessage = res;
      })
      .catch(error=>{
        console.error(error);
      })
  }

}
