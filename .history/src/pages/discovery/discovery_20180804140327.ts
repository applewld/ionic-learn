import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController, ToastController } from 'ionic-angular';

import { DetailsPage } from '../details/details';
import { BaseUI } from '../../common/baseui';

import { RestProvider } from '../../providers/rest/rest';
// @IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  questions: string[];
  errorMessage: any;


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getQuestions()
      .subscribe(f => {
        console.log(f);
        this.questions = f;
        loading.dismiss();
      },
        error => this.errorMessage = <any>error);
  }

  doRefresh(refresher){
      this.getQuestions();
      refresher.complete();
  }
}
