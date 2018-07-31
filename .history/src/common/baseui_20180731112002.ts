import { LoadingController, Loading, ToastController, Toast } from 'ionic-angular';

export abstract class BaseUI {
    constructor() {
    }
    
    /**
     *通用的loading组件
     *
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
    protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }

    /**
     *通用的toast组件
     *
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
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