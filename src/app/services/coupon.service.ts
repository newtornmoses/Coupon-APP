import { Coupon } from './../models/coupon';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import {Storage} from '@ionic/storage'
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
Featured: Observable<any>;
category = new BehaviorSubject('Men');


  constructor(private db: AngularFirestore, private storage: Storage) {}


  // Get Coupons
fetch_Coupons(){

  this.CouponCollection = this.db.collection<Coupon>('advertiser');
this.Coupons = this.CouponCollection.valueChanges()

  return this.Coupons;
 
 }


 fetch_featured() {
  this.FeaturedCollection = this.db.collection('featured');
  this.Featured = this.FeaturedCollection.valueChanges()
  
    return this.Featured;
 }


// destroy Storage
destroy(){
   this.storage.remove('selectedProduct')
}








}
