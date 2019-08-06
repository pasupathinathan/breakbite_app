import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ProductsPage } from '../products/products';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  details: FormGroup;
  public userData = { "username": "", "email": "", "phone": "", "password": "","address":"" };
  data: any = {};
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http,
    public storage: Storage) {
    this.http = http;
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit() {
    this.details = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[6789][0-9]{9}')]),
      password: new FormControl('', [Validators.required]),
      address:new FormControl('',[Validators.required]),
    });
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  Submit() {
    this.showLoading();

    var link = 'http://localhost:81/projects/taxpare-web/api/register.php';
    var myData = JSON.stringify({
      username: this.userData.username, email: this.userData.email,
      phone: this.userData.phone, password: this.userData.password,address: this.userData.address
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
          this.storage.set('phone', this.userData.phone);
          this.loading.dismiss();
          this.navCtrl.setRoot(ProductsPage);
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...',
      duration: 2000
    });
    this.loading.present();
  }

}
