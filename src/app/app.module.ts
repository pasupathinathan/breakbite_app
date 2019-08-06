import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/products/products';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx'
import { AuthProvider } from '../providers/auth/auth';
import { KadDetailPage } from '../pages/kad-detail/kad-detail';
import { CartPage } from '../pages/cart/cart';
import { MurDetailPage } from '../pages/mur-detail/mur-detail';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PurhisPage } from '../pages/purhis/purhis';
import { MixDetailPage } from '../pages/mix-detail/mix-detail';
import { SevDetailPage } from '../pages/sev-detail/sev-detail';
import { OmmDetailPage } from '../pages/omm-detail/omm-detail';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    LoginPage,
    RegisterPage,
    KadDetailPage,
    CartPage,
    MurDetailPage,
    PurhisPage, 
   MixDetailPage,
   OmmDetailPage,
   SevDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    LoginPage,
    RegisterPage,
    KadDetailPage,
    CartPage,
    MurDetailPage,
    PurhisPage, 
   MixDetailPage,
   OmmDetailPage,
   SevDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    InAppBrowser
  ],
  
})
export class AppModule {}
enableProdMode();