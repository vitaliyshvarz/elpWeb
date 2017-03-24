import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../models/user';
import { AlertService }                            from '../services/alert.service';

@Injectable()

export class SessionService {

    constructor(private http: Http, private alertService: AlertService) { }

    addTokenHeader() {
        // create authorization header with jwt token
        const userData: any = JSON.parse(localStorage.getItem('currentUser')) || {};
        const sessionToken: any = JSON.parse(localStorage.getItem('sessionToken')) || {};
        let currentUser = !!userData.firstName ? userData : null;
        if (currentUser && sessionToken) {
            let headers = new Headers({ 'x-access-token': sessionToken });
            return new RequestOptions({ headers: headers });
        } else {
          this.alertService.error('No token found!');
        }
    }
}
