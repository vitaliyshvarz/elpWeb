import { Injectable }             from '@angular/core';
import { Router, CanActivate }    from '@angular/router';
import { AuthenticationService }  from '../services/authentication.service';
import { User }                   from '../models/user';
import { Observable }             from 'rxjs/Rx';


@Injectable()
export class AdminGuard implements CanActivate {
    private user: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate() {
        try {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
        } catch (err) {
            // not logged in so redirect to login page
            this.router.navigate(['/login-register']);
            return Observable.of(false);
        }

        if (this.user) {
            return this.authenticationService.isAdmin(this.user).map((status: any) => {
                if (status) {
                    return true;
                }
            }).catch((err) => {
                this.router.navigate(['/login-register']);
                return Observable.of(false);
            });
        } else if (this.user && this.user.type === 'default') {
            // not logged in so redirect to login page
            this.router.navigate(['/admin/home']);
            return Observable.of(false);
        } else {
            this.router.navigate(['/login-register']);
            return Observable.of(false);
        }
    }
}
