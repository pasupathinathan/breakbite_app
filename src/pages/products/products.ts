import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ProductsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

  snacksRoot = 'SnacksPage'
  oilRoot = 'OilPage'


  constructor(public navCtrl: NavController) {}

}
