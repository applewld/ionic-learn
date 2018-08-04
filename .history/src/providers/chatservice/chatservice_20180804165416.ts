import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

//聊天信息的属性
export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;//发送给谁的
  time: number | string;
  message: string;
  status: string;
}

//用户信息的属性
export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}

@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http) {
    // console.log('Hello ChatserviceProvider Provider');
  }


  /**
   *获取消息列表
   *从API获取 或者从模拟的JSON 获取
   * @returns null
   * @memberof ChatserviceProvider
   */
  getMessageList():Promise<ChatMessage[]>{
    const url = '../../assets/mock/msg-list.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().array as ChatMessage[])
      .catch(error => Promise.reject(error || '错误信息'));
  }

}
