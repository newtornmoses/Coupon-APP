
import { ShowFavComponent } from './../show-fav/show-fav.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage  {
favourites = []
constructor(public popoverController: PopoverController) {}

// show_coupon
show_offer(offer) {
this.presentPopover(offer)
}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShowFavComponent,
      event: ev,
      translucent: true,
      componentProps:ev
    });
    return await popover.present();
  }

  ionViewWillEnter() {
    this.favourites =  JSON.parse(localStorage.getItem( 'favourite'))
  }

  // remove_offer
  remove_offer(item, i) {
   this.favourites.splice(i, 1);
   localStorage.setItem('favourite', JSON.stringify(this.favourites))
  }


}
