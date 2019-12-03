import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PopupPage } from './../popup/popup.page';
import { Coupon } from './../models/coupon';
import { CouponService } from './../services/coupon.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PopoverController } from '@ionic/angular';
import  Swal from 'sweetalert2'
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
  constructor(private service: CouponService, private clipboard: Clipboard,
    public popoverController: PopoverController, private splash: SplashScreen
    ) { 
    this.service.fetch_Coupons().subscribe(data => {  
    this.service.$FeaturedCollection.next(data)    
     this.FeaturedCoupons = data;
     
  })

  this.service.fetch_featured().subscribe(coupon => {
    this.featured = coupon
    console.log(this.featured);
    
  })
 
}





ionViewDidLeave() {
  console.log('view destroyed');
  
  this.service.destroy();
  if(this.fetchedCoupons) {
    this.fetchedCoupons.unsubscribe();
  }
}



// Get last  fetched data
suscribedData() {
 this.fetchedCoupons = this.service.$FeaturedCollectionObs.subscribe( data => this.FeaturedCoupons = data);

}

slideOpts = {
  initialSlide: 1,
  speed: 400
};


// Search
loadCategory(e) {
 
    this.suscribedData()
    this.FeaturedCoupons =  [...this.FeaturedCoupons].filter(data =>data.category.indexOf(e) != -1 )
 
  } 



  // search for store
search(name) {
  
  this.suscribedData()
  this.FeaturedCoupons = [...this.FeaturedCoupons].filter(data =>data.name.toLowerCase().indexOf(name.target.value.toLowerCase()) != -1 )
}

// Copy Code
copyCode(code) {
  
    this.clipboard.copy(code);
 
  
}

// ShowPop up
async showtPopover(ev: any, code, url, image) {
  const popover = await this.popoverController.create({
    component: PopupPage,
    event: ev,
    translucent: true,
    componentProps: {
      code:code,
      URL_link:url,
      img_Url:image
    }
  });

 this.copyCode(code)
 
  return await popover.present();
}
  

/* To copy any Text */
showPopover(val: string, name){

   
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.showalert(name)
  }

  showalert(name:object) {

    Swal.fire({
      width: 600,
    
      confirmButtonText: 'Cancel',
  text: `Coupon ${name['Coupon']} copied `,
  imageUrl: name['logo'],
  imageWidth: 200,
  imageHeight: 100,
  

  html:
  ` <p  class="success">Coupon ${name['Coupon']} copied</p><br>
  <a id="increase"   color="primary" href= ${name['URL_link']}  target="_blank" class="btn-warning">
    Visit Site
  </a>`
  
    })

    
  }





}
