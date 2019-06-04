import { Injectable} from '@angular/core';
import { User} from '../_models/User';
import { Resolve , Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_service/User.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AuthService } from '../_service/auth.service';

@Injectable()
export class MemberEditeResolver implements Resolve<User> {

    constructor(private userService: UserService,
        private auth: AuthService,
        private router: Router,
        private alertify: AllertifyserviceService) {
        }
resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.auth.decodeToken.nameid).pipe(
        catchError(error => {
            this.alertify.error(error);
            this.router.navigate(['/members']);
            return of(null);
        })
    );
}

}


