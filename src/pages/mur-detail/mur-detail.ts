import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, App } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';



@IonicPage()
@Component({
  selector: 'page-mur-detail',
  templateUrl: 'mur-detail.html',
})
export class MurDetailPage {

  productCount: number = 1;
  itemname: string="Murukku";
  amount:number=40;
  Amt1:number=40;
  link:string="assets/imgs/muru.jpg";
  public items: Array<any> = [];
  public data: any = {};
  loading: any;
  public username:"";
  public phone:"";
  public address:"";
  details: FormGroup;
  userid: any;
  uid: any;
  usn: any;
  email: any;
  add: any;
 
 
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http,
    public storage: Storage, public app: App) {
    this.http = http;
    }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
      this.Amt1=this.amount*this.productCount;
    }
  }

  incrementProductCount() {
    this.productCount++;
    this.Amt1=this.productCount*this.amount;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MurDetailPage');
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

          this.uid=data[0].Id;
          this.usn=data[0].username;
          this.email=data[0].email;
          this.add=data[0].address;
      
          this.loading.dismiss();
        }, error => {
          console.log(error);
        });
    });
  }

 
  


//addcart function goto save database and retrive cart page value 
addcart()
{
  var link = 'http://localhost:81/projects/taxpare-web/api/addcart.php';
  var myData = JSON.stringify({

    userid:this.uid,
    usn:this.usn,
    email:this.email,
    address:this.add,
    phone: this.data.phone,
    purchaseitemname:this.itemname,
    amount:this.Amt1,
    img:this.link
  });
  console.log("update:",myData);
  this.http.post(link, myData)
    .subscribe(data => {
      this.data.response = data["_body"];
      console.log(this.data.response);
        this.app.getRootNav().push(CartPage,{item:this.itemname,item2:this.Amt1,item3:this.link});
      },  error => {
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


 
