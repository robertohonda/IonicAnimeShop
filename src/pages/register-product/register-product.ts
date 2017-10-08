import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertProvider } from '../../providers/alert/alert';

import { Product } from '../../models/product';
import { ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-register-product',
  templateUrl: 'register-product.html',
})
export class RegisterProductPage {
  product = {} as Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    private alert: AlertProvider,
    private productProv: ProductProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterProductPage');
  }

  
  getImageDevice(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.product.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
      this.alert.showAlert('Error!', err);
    });
  }

  teste(){
    this.product.price = parseFloat((''+this.product.price).replace(',', '.'));
    this.product.quantity = parseInt(''+this.product.quantity);

    this.productProv.register(this.product);
    console.log(this.product);
  }


}
