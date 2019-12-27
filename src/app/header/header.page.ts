import { CouponService } from './../services/coupon.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {FilterPage} from '../filter/filter.page'

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  searchTerm = ''
  constructor(private nvtr: NavController, private Service: CouponService,
   public modal_controller: ModalController 
    ) { }


      //  filter_Modal
 async filter_Modal() {
  const modal  = await this.modal_controller.create({
    component: FilterPage
  });
  return await modal.present();
}



// goHome
onClick() {
  this.nvtr.navigateForward('/')
 
   }

   search(e) {
   console.log('serachTerm',this.searchTerm)
   console.log('keydown', e.target.value)
   const word = e.target.value
   this.Service.$FeaturedCollection.subscribe(data =>  {


   const filtered_data =   data.filter(elem =>  elem.name.toLowerCase().indexOf(word.toLowerCase()) > -1);
 this.Service.$selectedCollection.next(filtered_data);
     console.log(filtered_data)
   })

   }




  ngOnInit() {
    
  }

}
