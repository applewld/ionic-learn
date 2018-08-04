import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';
import { Events } from 'ionic-angular';
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
  editorMessage: string;
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

    //听取消息的发布，订阅
    this.event.subscribe('chat.received', (msg, time) => {
      this.messageList.push(msg);
      this.scrollToBottom();
    })
  }

  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
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
    if (!this.editorMessage.trim())
      return;

    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    }

    this.chatMessageList.push(messageSend);
    console.log(this.chatMessageList);
    this.scrollToBottom();

    this.editorMessage = '';

    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }

    //发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
      .then(() => {
        let index = this.getMessageIndex(id);
        if (index !== -1) {
          this.chatMessageList[index].status = 'success';
        }
      });

  }

  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }


  getMessageIndex(id: string) {
    return this.chatMessageList.findIndex(e => e.messageId === id);
  }


}
