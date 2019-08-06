import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KadDetailPage } from '../kad-detail/kad-detail';
import { MurDetailPage } from '../mur-detail/mur-detail';
import { MixDetailPage } from '../mix-detail/mix-detail';
import { OmmDetailPage } from '../omm-detail/omm-detail';
import { SevDetailPage } from '../sev-detail/sev-detail';

@IonicPage()
@Component({
  selector: 'page-snacks',
  templateUrl: 'snacks.html',
})
export class SnacksPage {
  productCount: number = 1;
  itemname: string="Kadalai Mittai";
  amount:number=40;
  Amt1:number=40;
  link:string="assets/imgs/kadalai.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App) {
  }


det()
{
 this.app.getRootNav().push(KadDetailPage);
}

mur()
{
  this.app.getRootNav().push(MurDetailPage);
}

mix()
{
  this.app.getRootNav().push(MixDetailPage);
}

omm()
{
  this.app.getRootNav().push(OmmDetailPage);
}

sev()
{
  this.app.getRootNav().push(SevDetailPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SnacksPage');
  }





  
}
