import { Injectable} from '@angular/core';
import { User} from '../_models/User';
import { Resolve , Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_service/User.service';
import { AllertifyserviceService } from '../_service/allertifyservice.service';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService,
        private router: Router,
        private alertify: AllertifyserviceService) {
        }
resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
        catchError(error => {
            this.alertify.error('Error in retrive data');
            this.router.navigate(['/members']);
            return of(null);
        })
    );
}

}


