import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Logged }         from '../definitions/logged';
import { LoggedService }  from '../services/logged.service';

import 'rxjs/add/operator/map';

declare const FB: any;
declare const gapi: any;

@Injectable()
export class AuthenticationService {
    private logged: Logged;
    constructor(
        private http: Http,
        private loggedService: LoggedService
    ) { }

    login(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({
            email: email,
            password: password
        })).map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
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
        });
    }

    logout() {
        // remove user from local storage to log user out
        gapi.auth.signOut();
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

}
