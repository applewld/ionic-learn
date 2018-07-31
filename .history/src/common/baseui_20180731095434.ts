import { LoadingController } from 'ionic-angular';

export abstract class BaseUI {
    constructor(public loadingCtrl: LoadingController) {
    }

    protected showLoading(loadingCtrl: LoadingController, message: string) {
        let loader =  loadingCtrl.create({
            content:message,
            dismissOnPageChange:true
        });
        loader.present();
        return loader;
    }
}