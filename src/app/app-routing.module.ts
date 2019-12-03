import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },

  { path: 'header', loadChildren: './header/header.module#HeaderPageModule' },
  { path: 'footer', loadChildren: './footer/footer.module#FooterPageModule' },
  { path: 'store', loadChildren: './store/store.module#StorePageModule' },
  { path: 'deals', loadChildren: './deals/deals.module#DealsPageModule' },
  { path: 'coupons', loadChildren: './coupons/coupons.module#CouponsPageModule' },
  { path: 'popup', loadChildren: './popup/popup.module#PopupPageModule' },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
