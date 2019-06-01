import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }
login() {
 // debugger;
  this.authservice.login(this.model).subscribe(next => {
    console.log('success Login');
  }, error => {
    console.log('Faild Login');
  });
}
loggedIn() {
return this.authservice.loggedIn();
}
}
