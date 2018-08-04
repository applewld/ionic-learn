import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  id: string;
  userid: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: boolean;
  isMyQuestion:boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage
  ) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQusetion(this.id);
  }

  loadQusetion(id) {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userid = val;
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getQuestionWithUser(this.id, val)
          .subscribe(q => {
            this.question = q;
            this.answers = q["Answers"];
            this.isFavourite = q["IsFavourite"];
            this.isMyQuestion = (q["OwnUserId"] == val);
            loading.dismiss();
          },
            error => this.errorMessage = <any>error
          );
      }
    });

  }

  saveFavourite() {
    var loading = super.showLoading(this.loadingCtrl, "请求中...");
    this.rest.saveFavourite(this.id, this.userid)
      .subscribe(f => {
        if (f["Status"] == "OK") {
          loading.dismiss();
          super.showToast(this.toastCtrl, this.isFavourite ? "取消关注成功" : "关注问题成功");
          this.isFavourite = !this.isFavourite;
        }
      },
        error => this.errorMessage = <any>error
      );
  }
}
