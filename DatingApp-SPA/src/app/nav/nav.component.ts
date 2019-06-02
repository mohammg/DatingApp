import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authservice: AuthService, private alertify: AllertifyserviceService) { }

  ngOnInit() {
  }
login() {
 // debugger;
  this.authservice.login(this.model).subscribe(next => {
    this.alertify.success('success Login');
  }, error => {
    this.alertify.error('Failed Login');
    console.log('Faild Login');
  });
}
logout() {
this.authservice.logout();
this.alertify.warning('Login Out');
}
loggedIn() {

return this.authservice.loggedIn();
}
}
