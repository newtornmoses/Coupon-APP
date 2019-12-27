import {  Subscription } from 'rxjs';
import { CouponService } from '../services/coupon.service';
import { Component, OnInit , AfterViewInit, OnDestroy} from '@angular/core';
import {ModalController} from '@ionic/angular'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit, AfterViewInit, OnDestroy {
shopping: Boolean
categories = []
categoriesList = []
FeaturedCoupons = []
filtered_data = []
featuredColObs: Subscription;
selected:boolean = false;
  constructor(private modalCtrl: ModalController, private store: CouponService, private alert: AlertController) { }

  ngOnInit() {
  
  }
  
  onClick(class_name) {
    this.selected = true;
    this.filtered_data =   [...this.FeaturedCoupons].filter(elem =>  elem.category.toLowerCase().indexOf(class_name.toLowerCase()) > -1);
    const doc =   (document.querySelector( '.'+class_name)as HTMLElement)
   doc.classList.add( 'isSelected')
   if (this.categoriesList.includes(class_name)) {
    console.log(this.categoriesList);
   } else {
    // sort 
    this.filtered_data.forEach(elmt =>this.categories.push(elmt) )
    console.log(this.categories);
  }
}
    

// filter
appy_filter() {
  if(this.selected) {
    this.store.$selectedCollection.next(this.categories);
    this.Dismiss();
  }else {
    this.presentAlert('Please select any category to proceed')
    return;
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

ngOnDestroy() {
  this.featuredColObs.unsubscribe()
}


  ngAfterViewInit() { 
   this.featuredColObs = this.store.$FeaturedCollection.subscribe(elem => {
      this.FeaturedCoupons = elem;
    })  
  }


  Dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
