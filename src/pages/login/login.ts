import { Component, OnInit } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network/ngx'
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
import { ProductsPage } from '../products/products';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  details: FormGroup;
  public userData = { "phone": "", "password": "" };
  public items: any = {};
  data: any = {};
  loading: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http,
    private storage: Storage, public network: Network,public auth: AuthProvider) {

    this.http = http;

    this.storage.get('phone').then((val) => {
      console.log(val);
      console.log('Your Phone is', val);
    });
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.details = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('[6789][0-9]{9}')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  //register page
  register() {
    this.navCtrl.push(RegisterPage);
  }

  


  Submit() {
    this.showLoading1();
    var link = 'http://localhost:81/projects/taxpare-web/api/login.php';
    var myData = JSON.stringify({
      phone: this.userData.phone, password: this.userData.password
    });
    console.log(myData);
    this.http.post(link, myData).map(res => res.json())
      .subscribe((data: any) => {
        console.dir(data);
        this.items = data;
        if (this.items == 'success') {
          this.storage.set('phone', this.userData.phone);
          this.navCtrl.setRoot(ProductsPage);
          this.loading.dismiss();
        } else {
          const alert = this.alertCtrl.create({
            title: 'Incorrect Phone/Password',
            buttons: ['OK']
          });
          this.loading.dismiss();
          alert.present();
        }
      }, error => {
        console.log(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...',
      duration: 2000
    });
    this.loading.present();
  }

  showLoading1() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...',
      duration: 3500
    });
    this.loading.present();
  }
}
