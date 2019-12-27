import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
options
register = true;
login = false;
isEngSelected = false;
isArSelected = true;
  constructor( private router: Router) { 
    this.storage_status()
  }
  
    // check storage
     storage_status() {
      const is_set =localStorage.getItem('welcome_Complete')
      if(is_set) {
        this.router.navigateByUrl('/home');
      }
     
    }

   onClick() { 
    this.router.navigateByUrl('/login')
  }

  selectLanguage(lang) {
    if (this.isEngSelected) {
      this.isEngSelected = !this.isEngSelected;
      this.isArSelected = !this.isArSelected
    } else {

      this.isEngSelected = !this.isEngSelected;
      this.isArSelected = !this.isArSelected
    }
  }

}
