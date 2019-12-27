import { CouponService } from './services/coupon.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {timer} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular'; 
import {Router} from '@angular/router';
import { Adjust, AdjustConfig, AdjustEnvironment, AdjustLogLevel } from '@ionic-native/adjust/ngx';
import {  AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showspiner = true;
  loggedin: boolean= false
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private  _translate: TranslateService,
    private menuCtrl: MenuController,
     private router: Router,
    private  adjust: Adjust,
    private service: CouponService
    , private auth: AngularFireAuth
  ) {
    this.initializeApp();
    _translate.setDefaultLang('ar');
    this.user_status();
  }

// check user Status
user_status() {
  try{
    const user=  JSON.parse( localStorage.getItem('user'))
    if(user.length > 0) {
      this.loggedin = true
    }else {
      this.loggedin = false
    }
    }catch{

    }
}
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();   
      this.showspiner =true
         timer(3000).subscribe(() =>  {
          this.storage_status();  
          this.showspiner = false;
          this.service.fetch_Coupons();
          // this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.adjust_tracker() 
     }  )
    });
  }


  // logout
   logout() {
     this.auth.auth.signOut().then(_ => {
      this.loggedin = false;
      localStorage.removeItem('user')
    }).catch(_ => { })
  }

   // check storage
   storage_status() {
    const is_set =localStorage.getItem('welcome_Complete')
    
    if(is_set== 'true') {
      this.router.navigateByUrl('/home'); 
    } 
  }
 
  // adjust tracking
  adjust_tracker() {
    const adjustConfig = new AdjustConfig(environment.ADJUST_Token,  AdjustEnvironment.Production);
    adjustConfig.logLevel = AdjustLogLevel.Verbose;
    this.adjust.create(adjustConfig); 
  }

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }

changeLanguage2 (newLanguage: string) {
  this._translate.use('ar');
  this.menuCtrl.close()
}

changeLanguage1 (newLanguage: string) {
  this._translate.use('en');
  this.menuCtrl.close()
}

}
