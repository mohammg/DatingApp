import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_service/User.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberListResolver implements Resolve<User[]> {
constructor(private userservice: UserService,
    private alertify: AllertifyserviceService,
    private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
return this.userservice.getUsers().pipe(
    catchError(error => {
        this.alertify.error('Error in retrive data');
        this.router.navigate(['/home']);
        return of(null);
    })
);

    }
}
