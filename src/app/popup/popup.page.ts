import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {

  constructor(private popoverController: PopoverController ) { }

  ngOnInit() {
  
  }


  // close pop up
closepopup() {
  this.popoverController.dismiss()
  // await popover.dismiss()

}

}
