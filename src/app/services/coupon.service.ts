import { HttpClient } from '@angular/common/http';
import { Coupon } from './../models/coupon';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import * as JSONdata from "../../assets/i18n/ar.json";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  $Coupons = new BehaviorSubject(null);
$CouponsObs = this.$Coupons.asObservable();
$FeaturedCollection = new BehaviorSubject([]);
$FeaturedCollectionObs = this.$FeaturedCollection.asObservable();
$selectedCollection = new BehaviorSubject([]);
$selectedCollectionObs = this.$selectedCollection.asObservable();
CouponCollection: AngularFirestoreCollection<Coupon>;
Coupons: Observable<Coupon[]>;
SliderCollection: AngularFirestoreCollection<Coupon>;
Sliders: Observable<Coupon[]>;
FeaturedCollection: AngularFirestoreCollection<Coupon>;
language: Observable<any>;
category = new BehaviorSubject('Men');
$selected_store = new BehaviorSubject([])
$selected_storeObs = this.$selected_store.asObservable()
LanguageCollection: AngularFirestoreCollection;
langfile = {}
  constructor(private db: AngularFirestore, private http:HttpClient) {}
  // Get Coupons
fetch_Coupons(){
this.CouponCollection = this.db.collection<Coupon>('advertiser');
this.Coupons = this.CouponCollection.valueChanges()

 this.Coupons .subscribe(data => {  
    this.$FeaturedCollection.next(data)
    this.$selectedCollection.next(data)  
  });
 }

 fetch_language() {
  this.LanguageCollection = this.db.collection('language');
  this.language = this.LanguageCollection.valueChanges()
  
   this.langfile = this.language.subscribe(data => data[0]['data']);
     return this.language;
 }

 loadfiles() {
   this.http.get( '../../assets/i18n/ar.json').subscribe(data => console.log('json file', data));
  //  this.http.post( '../../assets/i18n', {'ar':'err'});
 }

}
