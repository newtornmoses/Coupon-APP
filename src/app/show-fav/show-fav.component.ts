import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-show-fav',
  templateUrl: './show-fav.component.html',
  styleUrls: ['./show-fav.component.scss'],
})
export class ShowFavComponent implements OnInit {
product = {}
  constructor(public params: NavParams, private clipboard: Clipboard,
    public popoverController: PopoverController
    ) { 
    const data =  this.params.data
    console.log('from popover',data)

    this.product = data
  }

  // shopNow


shop_NowClick(url, code) {
  this.copyCode(this.product['code']);
  window.location.href =url
  }
  

  // Copy Code
copyCode(code) {
  
  this.clipboard.copy(code);
}


// cancel
cancel(){
  this.popoverController.dismiss()
}


  ngOnInit() {}

}
