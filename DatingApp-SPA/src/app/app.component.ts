import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper = new JwtHelperService();
  constructor(private auth: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse( localStorage.getItem('user'));
    if (token) {
this.auth.decodeToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.auth.currentuser = user;
      this.auth.ChangPhoto(this.auth.currentuser.photoUrl );
    }
  }
}
