import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterProductPage } from './register-product';

@NgModule({
  declarations: [
    RegisterProductPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterProductPage),
  ],
})
export class RegisterProductPageModule {}
