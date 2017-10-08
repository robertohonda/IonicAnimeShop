import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { MenuPagesProvider } from '../menu-pages/menu-pages';
import { RegisterProductPage } from '../../pages/register-product/register-product';

@Injectable()
export class UserProvider {
  currentUser: User = {name: '', username: '',email: '', password: '', isLogged: false, isAdmin: false};

  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private menu: MenuPagesProvider) {
    console.log('Hello UserProvider Provider');


    afAuth.authState.subscribe(user=>{
      let regProdObj = { title: 'Register Product', component: RegisterProductPage };

      if(user){
        this.db.database.ref('/users/').once('value').then( snapshot => {
          snapshot.forEach(element => {
            let tempUser = element.val();
            if(tempUser.email == user.email)
              this.currentUser = tempUser;
          });
        }).then(data => {
          this.currentUser.isLogged = true
          
          if(this.currentUser.isAdmin && this.menu.pages.indexOf(regProdObj)==-1)
            this.menu.pages.push(regProdObj);
          console.log(this.currentUser);
        });
      }
      else{
        let indexRegPage = this.menu.pages.findIndex(val =>{ return val.title === regProdObj.title && val.component === regProdObj.component });
        if(indexRegPage > -1)
          this.menu.pages.splice(indexRegPage, 1);
        this.currentUser.isLogged = false;
      }
    });

  }

}
