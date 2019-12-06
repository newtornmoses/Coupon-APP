import { Component, OnInit,  ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
options
register = true;
login = false;

  constructor(private storage: Storage, private router: Router) {}
  slideOpts = {
    // initialSlide: 1,
    // speed: 400
  };


 async  onClick() {
    await this.storage.set('welcomee_Complete', true);
    this.router.navigateByUrl('/home')
  
  }

  async finish() {
    await this.storage.set('welcomee_Complete', true);
    this.router.navigateByUrl('/');
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
