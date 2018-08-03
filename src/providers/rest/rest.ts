import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    // console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";


  /**
   *根据用户的mobile和password进行登录
   *
   * @param {*} mobile
   * @param {*} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }



  /**
   *用户注册
   *
   * @param {*} mobile
   * @param {*} nickname
   * @param {*} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  register(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password);
  }


  /**
   *获取用户信息
   *
   * @param {*} userid
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getUserInfo(userid): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userid);
  }

  /**
   *修改昵称
   *
   * @param {*} userid
   * @param {*} nickname
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  updateNickName(userid, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userid + "&nickname=" + nickname);
  }

  /**
   *保存问题
   *
   * @param {*} userid
   * @param {*} title
   * @param {*} content
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  saveQuestion(userid, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userid + "&title=" + title + "&content=" + content);
  }
  /**
   *全局获取HTTP请求的方法
   *
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *处理接口返回的数据，处理成json格式
   *
   * @private
   * @param {*} res
   * @returns
   * @memberof RestProvider
   */
  private extractData(res) {
    let body = res.json();
    return JSON.parse(body) || {};
  }


  /**
   *处理请求中的错误，考虑了各种情况的错误
   *
   * @private
   * @param {*} error
   * @returns
   * @memberof RestProvider
   */
  private handleError(error) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
