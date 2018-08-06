import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController , ToastController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

import { DetailsPage } from '../details/details';
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  errorMessage:string;
  notificationList:string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log(1)
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserNotification(val)
          .subscribe(
            n => {
              this.notificationList = n;
              loading.dismissAll();
            },
            error=> this.errorMessage = <any>error
          );
            
      }
    });
  }

  gotoDetails(questionId){
      this.navCtrl.push(DetailsPage,{id:questionId});
  }
}
