import { CouponService } from './../services/coupon.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
Store = [];
storeSub: Subscription;

  constructor(private service: CouponService) {
 this.storeSub = this.service.$FeaturedCollectionObs.pipe(
    map(data => data.map(elem =>elem ))
  ).subscribe(store => this.Store = store)

 
 
   }

ionViewDidLeave() {
  console.log('store has been left');
  if(this.storeSub) {
    this.storeSub.unsubscribe()
  }
  

}


// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
slideOpts = {
  initialSlide: 2,
  speed: 400,
  slidesPerView:5,
  // spaceBetween: 10,
  centeredSlides: true
};

  ngOnInit() {
    console.log('store', this.Store)
    
  }

}
