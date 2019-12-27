import {  AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  register = true;
  login = false;
  password: string = '';
  email: string = '';
  name: string = '';
  loader
  
  constructor( private router: Router , private auth: AngularFireAuth, 
    private alert: AlertController, private loading: LoadingController) { 
      try{
      const user=  JSON.parse( localStorage.getItem('user'))

      if(user.length > 0) {
        this.router.navigateByUrl('/home')
      }
 

      }catch{

      }
    }
 
   onClick() {
     this.presentLoading()
     this.router.navigateByUrl('/home');
     setTimeout(() => {
      this.loader.dismiss();  
     }, 2000);
   
  }

    async onsignup() {
      if(this.email== "" || this.name=="" || this.password=="") {
        this.presentAlert('Please fill all the fields')
        return;
      }
  this.presentLoading()
     this.auth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data =>  {
      const user_details = [] 
      user_details.push(data['user'])
      localStorage.setItem('user', JSON.stringify(user_details))
      if(data['user']) {
       this.loader.dismiss();  
        
        this.router.navigateByUrl("/home")
      }
      }).catch(e =>{
         this.loader.dismiss();

        this.presentAlert('Wrong credentials. \n Please check your email or password(min 6 characters)')
        
      })   
  }

  // Alert controller
  async presentAlert(msg) {
    const alert = await this.alert.create({
  
      subHeader: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Loading Controller
  async presentLoading() {
   this.loader = await this.loading.create({
      message: 'Please wait ......',
      duration: 2000
    });
    await this.loader.present();
  }


  async onlogin() {
    if(this.email== "" ||  this.password=="") {
      this.presentAlert('Please fill all the fields')
      return;
    }
this.presentLoading()
   this.auth.auth.signInWithEmailAndPassword(this.email, this.password)
  .then(data =>  {
    
  
    if(data['user']) {
     this.loader.dismiss(); 
     const user_details = [] 
     user_details.push(data['user'])
      localStorage.setItem('user', JSON.stringify(user_details))
      this.router.navigateByUrl("/home")
    }
    }).catch(e =>{
       this.loader.dismiss();

      this.presentAlert('Wrong credentials.')
      
    })   
    
  }

  toggle_login() {
    this.login = true;
    this.register  = false;
  }

  toggle_register() {
    this.register = true;
    this.login = false;
  }



  ngOnInit() {
  }

}
