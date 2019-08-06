import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Nav, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
//import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { ProductsPage } from '../../pages/products/products';
import { PurhisPage } from '../../pages/purhis/purhis';

//import { DashboardPage } from '../../pages/dashboard/dashboard';

@Injectable()
export class AuthProvider {

  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform, public httpc: HttpClient,
    public iab: InAppBrowser, public loadingCtrl: LoadingController,
    public http: Http) {

    console.log('Hello AuthProvider Provider');
  }

  
  pay(phone) {
    const browser = this.iab.create("http://localhost:81/projects/taxpare-web/api/mypayment.php?phone=" + phone, "_self", {
      location: 'no',
      clearcache: 'yes',
      hardwareback: 'no',
    });
    browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      if (event.url == "http://localhost:81/projects/taxpare-web/api/sus.php") {
        timer(3000).subscribe(() => browser.close())
        this.nav.setRoot(PurhisPage);
      }
    });
  }

}
