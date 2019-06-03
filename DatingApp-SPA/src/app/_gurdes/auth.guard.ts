import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authservice: AuthService, private alertify: AllertifyserviceService, private roouter: Router) { }
  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      return true;
    }
    this.alertify.error('You must be login');
    this.roouter.navigate(['/home']);
    return false;
  }
}
