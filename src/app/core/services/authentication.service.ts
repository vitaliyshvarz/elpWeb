import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Logged }         from '../definitions/logged';
import { AlertService }   from '../services/alert.service';
import { LoggedService }  from '../services/logged.service';

import { User }           from  '../models/user';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

declare const FB: any;
declare const gapi: any;

@Injectable()

export class AuthenticationService {
    private logged: Logged;
    constructor(
        private http: Http,
        private loggedService: LoggedService,
        private alertService: AlertService,
    ) { }

    login(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({
            email: email,
            password: password
        })).map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json().user;
            if (user && user.token) {
                // store user details and jwt token in local storage
                // to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.logged = {
                    email: user.email,
                    firstName: user.firstName
                };
                this.loggedService.setLogged(this.logged);
            }
        })
        .catch((error: any) => {
            this.alertService.error(error || 'Error login');
            return Observable.throw(error || 'Error login')
        });
    }

    logout() {
        // remove user from local storage to log user out
        try {
            gapi.auth.signOut();
        } catch (err) {
            console.warn('google logout not available', err);
        }
        localStorage.removeItem('currentUser');
        try {
            if (FB.getAuthResponse()) {
                FB.logout();
            }
        } catch (err) {
            console.warn('FB logout not available');
        }
        this.loggedService.setLogged(this.logged);
    }

    isAdmin (user: User): Observable<boolean> {
        return this.http.post(`/api/is-admin`, user)
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error isAdmin');
                return Observable.throw(error || 'Error isAdmin')
            });
    }

    sendRecoveryPassEmail(email: string): Observable<{}> {
        return this.http.post(`/api/send-recovery-pass-email`, email)
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error sending Recovery email');
                return Observable.throw(error || 'Error sending Recovery email')
            });
    }

}
