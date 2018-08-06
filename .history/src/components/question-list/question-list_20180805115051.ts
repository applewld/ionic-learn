import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController , ToastController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

import { DetailsPage } from '../../pages/details/details';
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI{

  errorMessage:string;
  questions:string[];

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

  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id:questionId});
}
}
