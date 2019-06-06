import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthService {
baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodeToken: any;
currentuser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
CurrentPhotoUrl = this.photoUrl.asObservable();


  constructor(private http: HttpClient) { }
login(model: any) {
return this.http.post(this.baseUrl + 'login', model )
.pipe(map((response: any) => {
  const user = response;
if (user) {
  localStorage.setItem('token', user.token);
  localStorage.setItem('user', JSON.stringify( user.user));
  this.decodeToken = this.jwtHelper.decodeToken(user.token);
  this.currentuser = user.user;
  this.ChangPhoto(this.currentuser.photoUrl);
  console.log(this.decodeToken);
  console.log(user.user);
}
}));

}
register(model: any) {
  return this.http.post(this.baseUrl + 'register', model );
  }
loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.currentuser = null;
  this.decodeToken = null;

  console.log('loggen out');
}
ChangPhoto(url: string) {
  // this.currentuser.photoUrl = url;
  this.photoUrl.next(url);
}
}

