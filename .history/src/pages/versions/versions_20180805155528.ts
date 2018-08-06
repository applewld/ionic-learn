import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
@IonicPage()
@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {

  appName:string;
  packageName:string;
  versionCode:string;
  VersionNumber:string;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public appVersion:AppVersion) {
  }

  ionViewDidEnter(){
    this.appVersion.getAppName();
    this.appVersion.getPackageName();
    this.appVersion.getVersionCode();
    this.appVersion.getVersionNumber();
  }
}
