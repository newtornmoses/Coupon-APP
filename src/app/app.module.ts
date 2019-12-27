import { ShowFavComponent } from './show-fav/show-fav.component';
import { FilterPage } from './filter/filter.page';
import { filterPageModule } from './filter/filter.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment.prod';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Adjust } from '@ionic-native/adjust/ngx'; // AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
} @NgModule({ declarations: [AppComponent, FilterPage, ShowFavComponent ], entryComponents: [FilterPage,ShowFavComponent], imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule.enablePersistence(), AngularFireAuthModule, HttpClientModule, TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] } }), filterPageModule, ], providers: [ StatusBar, SplashScreen, Clipboard, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SocialSharing, Adjust ], bootstrap: [AppComponent]
})
export class AppModule {}
