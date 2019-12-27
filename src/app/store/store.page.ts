import { CouponService } from './../services/coupon.service';
import { Component } from '@angular/core';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage  {
Store = [];
storeSub: Subscription;
isSelected = false
store_dup = []

  constructor(private service: CouponService) {
 this.storeSub = this.service.$FeaturedCollectionObs.pipe(
    map(data => data.map(elem =>elem ))
  )
  .subscribe(store => {
    this.Store = store.sort((a, b)=> {
    const nameA=a.category.toLowerCase(), nameB=b.category.toLowerCase();
    return nameA.localeCompare(nameB)
    })
  });
   }

ionViewDidLeave() {
  if(this.storeSub) {
    this.storeSub.unsubscribe()
  }
}

select_store(store) {
  this.store_dup =[]
  const dup = [...this.Store]
  dup.filter((elem, index) => {
    if(elem.category == 'All') {
      this.service.$selectedCollection.next( this.Store);
      return
    }
    if (elem == store) {
      this.isSelected = true;
      this.store_dup.push(store)
      this.service.$selectedCollection.next( this.store_dup)
    }
  }) 
}

// slides options
slideOpts = {
  initialSlide: 2,
  speed: 400,
  slidesPerView:5,
  // spaceBetween: 10,
  centeredSlides: true
};

}
