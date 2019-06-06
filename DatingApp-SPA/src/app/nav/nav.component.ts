import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
photpUrl: string;
  constructor(public authservice: AuthService, private alertify: AllertifyserviceService, private roouter: Router) { }

  ngOnInit() {
    this.authservice.CurrentPhotoUrl.subscribe(p => this.photpUrl = p);
  }
login() {
 // debugger;
  this.authservice.login(this.model).subscribe(next => {
    this.alertify.success('success Login');
  }, error => {
    this.alertify.error('Failed Login');
    console.log('Faild Login');
  }, () => {
    this.roouter.navigate(['/members']);
  });
}
logout() {
this.authservice.logout();
this.alertify.warning('Login Out');
this.roouter.navigate(['/home']);
}
loggedIn() {
return this.authservice.loggedIn();
}
}
