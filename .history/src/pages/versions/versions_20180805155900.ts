import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
@IonicPage()
@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {

  appName: string;
  packageName: string;
  versionCode: string | number;
  VersionNumber: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appVersion: AppVersion) {
  }

  ionViewDidEnter() {
    this.appVersion.getAppName().then(v => {
      this.appName = v;
    });
    this.appVersion.getPackageName().then(v => {
      this.packageName = v;
    });
    this.appVersion.getVersionCode().then(v => {
      this.versionCode = v;
    });
    this.appVersion.getVersionNumber().then(v => {
      this.VersionNumber = v;
    });
  }
}
