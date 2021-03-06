import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavoritePage } from './favorite.page'; const routes: Routes = [ { path: '', component: FavoritePage }
]; @NgModule({ imports: [ CommonModule, FormsModule, IonicModule, TranslateModule, RouterModule.forChild(routes) ], declarations: [FavoritePage]
})
export class FavoritePageModule {}
