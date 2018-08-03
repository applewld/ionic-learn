import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

// @IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title:string;
  content:string;
  errorMessage:string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     public storage: Storage,
     public loadingCtrl: LoadingController,
     public toastCtrl:ToastController,
     public rest: RestProvider
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submitQuestion(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        var loading = super.showLoading(this.loadingCtrl,"发表中...");
        this.rest.saveQuestion(val,this.title,this.content)
        .subscribe(f=>{
          if(f["Status"]=="OK"){
            loading.dismiss();
            this.dismiss();
          }
          else{
            loading.dismissAll();
            super.showToast(this.toastCtrl,f["StatusContent"]);
          }
        },
        error=> this.errorMessage = <any>error
      );
      }
      else{
        super.showToast(this.toastCtrl,"请登录后再提问...");
      }
    });
    
  }

}
