import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeGuard } from './Guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
    // canActivate: [WelcomeGuard]
  },
  { path: 'welcome',
   loadChildren: './welcome/welcome.module#WelcomePageModule' },

  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [WelcomeGuard]
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
