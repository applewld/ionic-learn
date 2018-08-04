import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';

import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {


  chatUserName: string;
  isOpenEmojiPicker: boolean;
  chatMessageList: ChatMessage[] = [];
  userId: string;
  userName: string;
  userImgUrl: string;
  chatUserId: string;
  errorMessage: string;
  @ViewChild(Content) content: Content;
  @ViewChild('chatInput') messageInput: TextInput;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatserviceProvider,
    public rest: RestProvider,
    public storage: Storage) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }

  ionViewDidEnter() {

    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userId = '140000198202211138';
              this.userName = userinfo["UserNickName"];
              this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf(); //给资源文件添加后缀，去除缓存
              console.log(this.userId);
            },
            error => this.errorMessage = <any>error
          );

      }
    });

    this.getMessages()
      .then(() => {
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
      .then(res => {

        this.chatMessageList = res;

        console.log(this.chatMessageList);
      })
      .catch(error => {
        console.error(error);
      })
  }

  sendMessage() {

  }

  focus() {

  }

}
