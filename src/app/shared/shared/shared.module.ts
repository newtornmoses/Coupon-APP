import { PopupPageModule } from './../../popup/popup.module';
import { PopupPage } from './../../popup/popup.page';
import { IonicModule } from '@ionic/angular';
import { HeaderPage } from './../../header/header.page';
import { FooterPage } from './../../footer/footer.page';
import {StorePage} from './../../store/store.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ HeaderPage, StorePage],
  imports: [
    CommonModule,
    IonicModule,
    
  ],
  // exports:[ HeaderPage, StorePage]
  exports:[ HeaderPage, StorePage]

})
export class SharedModule { }
