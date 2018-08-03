import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;   //导入第三方的库定义到ts项目中

// @IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  userid: string;
  errorMessage: string;

  lastImage: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public file: File,
    public camera: Camera,
    public filePath: FilePath,
    public transfer: Transfer,
    public platform: Platform) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userid = val;
      }
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '使用相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();
  }


  takePicture(sourceType) {
    //定义相机的参数
    var options: CameraOptions = {
      quality: 100,//图片的质量
      sourceType: sourceType,
      saveToPhotoAlbum: false,//是否保存拍摄的照片到相册中去
      correctOrientation: true//是否纠正拍摄照片的方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理android平台的文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取android平台下的正确路径
          .then(filePath => {
            let corretPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let corretName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(corretPath, corretName, this.createFileName());
          });
      }
      else {
        let corretPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let corretName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(corretPath, corretName, this.createFileName());
      }
    }, (err) => {
      super.showToast(this.toastCtrl, "选择图片出现错误，请在app中操作或检查相关权限。")
    });
  }

  //将获取到的图片进行一下另存为
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      super.showToast(this.toastCtrl, "存储图片到本地图库失败。")
    });
  }
  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),
      n = d.getDate(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  //处理图片的路径为可以上传的路径
  pathForImage(img) {
    console.log(img);
    if (img === null) {
      return '';
    }
    else {
      console.log(cordova.file.dataDirectory);
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastImage);
    var filename   = this.userid + ".jpg";//定义上传后的文件名

    //上传的参数
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'filename': filename, 'userid': this.userid }
    }

    const fileTransfer: TransferObject = this.transfer.create();

    var loading = super.showLoading(this.loadCtrl, "上传中...");

    //开始正式上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传成功。");
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }
        , 3000);
    }, err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    });
  }
}
