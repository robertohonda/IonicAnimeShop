import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { AngularFireDatabase } from 'angularfire2/database';

import { AlertProvider } from '../alert/alert';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider{
  Category = {manga: 'Manga', lightnovel: 'Light Novel'};
  Genre = {
    drama: 'Drama',
    action: 'Action',
    adventure: 'Adventure',
    romance: 'Romance',
  };

  constructor(private db: AngularFireDatabase,
    private alert: AlertProvider) {
    console.log('Hello ProductProvider Provider');
  }

  getCategoryKeys(){
    return Object.keys(this.Category);
  }

  getCategoryValue(category: string){
    return this.Category[category];
  }

  getGenreKeys(){
    return Object.keys(this.Genre);
  }

  getGenreValues(genres: Array<any>){
    let values: Array<string> = [];

    genres.forEach(key =>{
      values.push(this.Genre[key]);
    })

    return values;
  }

  getGenreValuesString(genres: Array<any>){
    let output: string = '';

    genres.forEach(key =>{
      output += this.Genre[key] + ', ';
    })

    return output.slice(0, -2);
  }

  /*Função para registrar o produto no firebase*/
  register(product: Product){
    this.db.database.ref('/products').push(product).then(data =>{
      this.alert.showAlert('Info!', 'Product registred successfully!');
    }).catch(error =>{
      this.alert.showAlert('Error!', error.message);
    });
    
  }

  getAllProducts(){
    let products = [];

    this.db.database.ref("/products").once('value').then( snapshot =>{
      snapshot.forEach(child =>{
        products.push(child.val());
      });
    });

    return products;
  }
}
