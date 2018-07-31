import { LoadingController, Loading, ToastController, Toast } from 'ionic-angular';

export abstract class BaseUI {
    constructor() {
    }

    protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }

    protected showToast(toastCtrl: ToastController, message: string): Toast {
        let loader = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        loader.present();
        return loader;
    }
}