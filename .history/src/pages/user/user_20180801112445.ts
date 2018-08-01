import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController , ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  headface: string="http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg";
  nickname:string="加载中...";
  errorMessage:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              console.log(userinfo);
              this.nickname = userinfo["UserNickName"];
              this.headface = userinfo["UserHeadface"]+"?"+(new Date()).valueOf(); //给资源文件添加后缀，去除缓存
              loading.dismiss();
            },
            error=> this.errorMessage = <any>error
          );
            
      }
    });
  }

  updateNickName(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        var loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(val,this.nickname)
          .subscribe(
            f=>{
              if(f["Status"]=="OK"){
                loading.dismiss();
                super.showToast(this.toastCtrl,"昵称修改成功。");
              }
              else{
                loading.dismiss();
                super.showToast(this.toastCtrl,f["StatusContent"]);
              }
            },
            error=>this.errorMessage = <any>error
          );
      }
    });
  }
}
