import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showspiner = true;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Favourite',
      url: '/',
      icon: 'heart'
    },

    {
      title: 'Register/Login',
      url: '/deals',
      icon: 'contact'
    },

    {
      title: 'Store',
      url: '/store',
      icon: 'basket',
     
    } ,

 ,


    {
      title: 'Select Language',
      url: '/store',
      icon: 'barcode',
      
    }
    ,

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.showspiner =false
     timer(100).subscribe(() =>  {
       this.showspiner =false
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     }
    )
    });
  }
}
