import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { timer } from 'rxjs/observable/timer';
import { ProductsPage } from '../products/products';
import { AuthProvider } from '../../providers/auth/auth';




@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public items: Array<any> = [];
  public data: any = {};
  loading: any;
itemname:any;
amount:any;
  public username:"";
  public phone:"";
  public address:"";
  details: FormGroup;
  id: any;
  img:any;
  //auth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http,
    public storage: Storage,public iab:InAppBrowser,public auth:AuthProvider) {
    this.http = http;
   this.itemname=navParams.get('item');
   this.amount=navParams.get('item2');
   this.img=navParams.get('item3');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.profile();
  }

  ngOnInit() {
    this.details = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[6789][0-9]{9}')]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  profile() {
    this.showLoading();
    this.storage.get('phone').then((val) => {
      console.log('Your Phone is', val);
      this.data.phone = val;
      var link = 'http://localhost:81/projects/taxpare-web/api/profile.php';
      var myData = JSON.stringify({ phone: this.data.phone });
      console.log(myData);
      this.http.post(link, myData).map(res => res.json())
        .subscribe((data: any) => {
          console.dir(data);
          this.items = data;
          this.loading.dismiss();
        }, error => {
          console.log(error);
        });
    });
  }

  delete() {
    this.showLoading();
    this.storage.get('phone').then((val) => {
      console.log('Your Phone is', val);
      this.data.phone = val;
      var link = 'http://localhost:81/projects/taxpare-web/api/delete.php';
      var myData = JSON.stringify({ phone: this.data.phone });
      console.log(myData);
      this.http.post(link, myData).map(res => res.json())
        .subscribe((data: any) => {
          console.dir("mydata",data);
          this.items = data;
          this.navCtrl.setRoot(CartPage);
          this.loading.dismiss();
        }, error => {
          console.log(error);
        });
    });
  }




  update()
{

  this.showLoading();

  var link = 'http://localhost:81/projects/taxpare-web/api/update.php';
  var myData = JSON.stringify({
    username: this.username,
    phone: this.phone,
    address: this.address
  });
  console.log(myData);
  this.http.post(link, myData)
    .subscribe(data => {
      this.data.response = data["_body"];
      console.log(this.data.response);
      if (this.data.response == 'Register Successfully') {
        const alert = this.alertCtrl.create({
          title: this.data.response,
          subTitle: 'You are logged in',
          buttons: ['OK']
        });
        alert.present();
        this.storage.set('phone', this.phone);
        this.loading.dismiss();
      } else {
        const alert = this.alertCtrl.create({
          title: this.data.response,
          buttons: ['OK']
        });
        alert.present();
        this.loading.dismiss();
      }
    }, error => {
      console.log(error);
    });
}
pay() {
  this.storage.get('phone').then((val) => {
    console.log('Your Phone is', val);
    this.auth.pay(val);
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
