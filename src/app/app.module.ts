import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MorePage } from '../pages/more/more';
import { ChatPage } from '../pages/chat/chat';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { NotificationPage } from '../pages/notification/notification';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    MorePage,
    ChatPage,
    HomePage,
    TabsPage,
    DiscoveryPage,
    NotificationPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage
  ],
  imports: [
    BrowserModule,
    HttpModule,//全局导入 HTTP 模块
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    IonicStorageModule.forRoot()//全局导入 storige 模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MorePage,
    ChatPage,
    HomePage,
    TabsPage,
    DiscoveryPage,
    NotificationPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, //rest 的定义导入
    File,
    Transfer,
    FilePath,
    Camera
  ]
})
export class AppModule { }
