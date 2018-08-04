import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController, ToastController } from 'ionic-angular';

import { QuestionPage } from '../question/question';
import { DetailsPage } from '../details/details';
import { BaseUI } from '../../common/baseui';

import { RestProvider } from '../../providers/rest/rest';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  gotoQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  gotoChat() {
    this.selectTab(2);
  }

  /**
   *选定指定的tab
   *
   * @param {number} index
   * @memberof HomePage
   */
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getFeeds()
      .subscribe(f => {
        console.log(f);
        this.feeds = f;
        loading.dismiss();
      },
        error => this.errorMessage = <any>error);
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }
}
