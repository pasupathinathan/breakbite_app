import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/products/products';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { Network, Connection } from '@ionic-native/network/ngx';
import { PurhisPage } from '../pages/purhis/purhis';

declare var navigator: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = '';
  pages: Array<{ title: string, component: any }>;
  public data: any = {};
  loading: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private storage: Storage, public loadingCtrl: LoadingController, public auth: AuthProvider,
    public alertCtrl: AlertController) {
    this.initializeApp();
    this.network();

    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },*/
      {title:'Home', component:ProductsPage },
      {title:'Order', component:PurhisPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



  logout() {
    this.storage.clear();
    this.nav.setRoot(LoginPage);
  }

  network() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.NONE] = 'No Network Connection';
      if (states[networkState] == 'No Network Connection') {
        let alert = this.alertCtrl.create({
          subTitle: "Internet is not connected.Exit the app and Try again!",
          buttons: [{
            text: ("Ok")
          }]
        });
        alert.present();
      }
      else {
        this.showLoading();
        this.storage.get('phone').then((val) => {
          console.log(val);
          console.log('Your Phone is', val);
          if (val == null) {
            this.data.pass = 'null';
            console.log(this.data.pass);
          } else {
            this.data.pass = 'value';
            console.log(this.data.pass);
          }
          this.rootPage = (this.data.pass == 'null') ? LoginPage : ProductsPage;
        });
        this.loading.dismiss();
        this.loading = null;
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...',
      duration: 2000
    });
    this.loading.present();
  }
}

