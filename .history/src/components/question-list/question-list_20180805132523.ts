import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

import { DetailsPage } from '../../pages/details/details';
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI {

  errorMessage: string;
  questions: string[];
  //datatype外部传入 dataSourceType本地接受之后的参数命名
  @Input('datatype') dataSourceType;

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

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

  //这里没有ionViewDidLoad生命周期的函数
  ngAfterContentInit(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
            q => {
              this.questions = q;
              loading.dismissAll();
            },
            error=> this.errorMessage = <any>error
          );
            
      }
    });
  }

}
