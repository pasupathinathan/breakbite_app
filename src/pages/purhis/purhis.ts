import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-purhis',
  templateUrl: 'purhis.html',
})
export class PurhisPage {
  public items: Array<any> = [];
  public data: any = {};
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public http: Http,
    private storage: Storage) {
    this.http = http;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurhisPage');
    this.ohis();
  }

  ohis() {
    this.showLoading();
    this.storage.get('phone').then((val) => {
      console.log('Your Phone is', val);
      this.data.phone = val;
      var link = 'http://localhost:81/projects/taxpare-web/api/order1.php';
      var myData = JSON.stringify({ phone: this.data.phone });
      console.log(myData);
      this.http.post(link, myData).map(res => res.json())
        .subscribe((data: any) => {
          console.dir(data);
          this.items = data;
          this.loading.dismiss();
        }, error => {
          console.log("Oooops!");
        });
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