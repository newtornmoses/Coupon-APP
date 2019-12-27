import { environment } from './../../environments/environment.prod';
import { AlertController } from '@ionic/angular';
import { CouponService } from './../services/coupon.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Adjust, AdjustEvent } from '@ionic-native/adjust/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  {
  FeaturedCoupons = [];
  selectedPdt =[]
  fetchedCoupons: Subscription;
  featured = []
  ShowLoading = false
  constructor(private service: CouponService, private clipboard: Clipboard,
   private  _translate: TranslateService,
     private socialSharing: SocialSharing, private alert: AlertController,
     private  adjust: Adjust
    ) { 
      this.fetchedCoupons = this.service.$selectedCollectionObs.subscribe(elem => {
            this.FeaturedCoupons = elem;
            if (this.FeaturedCoupons.length === 0) {
              this.ShowLoading = true
             }else {
               this.ShowLoading = false
     }
    // _translate.setDefaultLang('en');
    _translate.setDefaultLang('ar');

  })     

  
this.storageCheck()
}


// check for storage
async storageCheck() {
 
 const storg= localStorage.getItem('welcome_Complete')

 if (!storg) {
  localStorage.setItem('welcome_Complete', 'true')
    
  }else {
    console.log('storage already  set');
  }

}

// Social Share

shareWhatsapp(description,code,URL){
  this.socialSharing.shareViaWhatsApp(`${description}\n Use this code  ${code} to get discount\n ${URL}` ).then( _=> {}).catch(e=> {})
}

// save favourites 
whitelist(pdt) {
const productlist = []
const fav = JSON.parse(localStorage.getItem('favourite'));
if (fav && fav.length > 0) {
 var found =fav.filter(elem => elem.Coupon.indexOf(pdt.Coupon)  > -1);
 console.log(found)
  if(found.length == 0) {
    fav.unshift(pdt)
    localStorage.setItem('favourite', JSON.stringify(fav));
    this.presentAlert('coupon saved to favourites')
  }
  else {
    this.presentAlert('This coupon was already saved to your favourites')
    return;
  }
 
}
else {
  productlist.push(pdt)
  localStorage.setItem('favourite', JSON.stringify(productlist));
  this.presentAlert('coupon saved to favourites')
}
}

  // Alert controller
  async presentAlert(msg) {
    const alert = await this.alert.create({
  
      subHeader: 'Update',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  // copy coupon 
  onCouponSelected(code) {
    this.track_copy_coupon_events()
    this.copyCode(code);
    this.presentAlert('coupon code coppied to clipboard')
  }


// Adjust track Events
track_copy_coupon_events() {
  this.adjust.trackEvent(new AdjustEvent(environment.ADJUST_Coupon_Event))
}


track_shop_events() {

  this.adjust.trackEvent(new AdjustEvent(environment.ADJUST_Shop_Event))
  }
  
// shopNow
shop_NowClick(url, code) {
  this.track_shop_events()
this.presentAlert('coupon code coppied ,  redirecting you to the store....');
this.copyCode(code);
setTimeout(() => {
  window.location.href =url
}, 2000);

}

ionViewDidLeave() {
this.fetchedCoupons.unsubscribe()
}


// Copy Code
copyCode(code) {
  
    this.clipboard.copy(code); 
}

loadLanguages(){
  // this.service.fetch_language().subscribe(data => console.log(data[0]['data']) )
  this.service.loadfiles()
  
  // console.log(this.service.loadfiles());
  
}

ionViewDidEnter() {
  this.loadLanguages()
}

}






