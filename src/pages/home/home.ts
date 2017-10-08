import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { Product } from '../../models/product';
import { ProductProvider } from '../../providers/product/product';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: Array<Product>;

  constructor(public navCtrl: NavController,
  private userProv: UserProvider,
  private productProv: ProductProvider ) {
    console.log('home');
    this.products = productProv.getAllProducts();
  }

  teste(){
    console.log(this.products);
  }

}
