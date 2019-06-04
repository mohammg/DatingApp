import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor( private router: Router, private auth: AuthService) { }

  ngOnInit() {
if (this.auth.loggedIn()) {
  this.router.navigate(['/members']);
}
  }
  registerToggel() {
    this.registerMode = true;
  }
  cancelRegisterModel(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
