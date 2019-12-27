import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
    // canActivate: [WelcomeGuard]
  },
  { path: 'welcome',
   loadChildren: './welcome/welcome.module#WelcomePageModule' ,
  //  canActivate: [WelcomeGuard]
  },
  

  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    // canActivate: [WelcomeGuard]
  },

  { path: 'header', loadChildren: './header/header.module#HeaderPageModule' },

  { path: 'store', loadChildren: './store/store.module#StorePageModule' },
 
  { path: 'filter', loadChildren: './filter/filter.module#filterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  // { path: 'showoffer', loadChildren: './showoffer/showoffer.module#ShowofferPageModule' },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
