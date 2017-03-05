import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../models/user';
import { AlertService }                            from '../services/alert.service';

@Injectable()

export class UserSearchService {

    constructor(private http: Http, private alertService: AlertService) { }

    search(term: string): Observable<User[]> {
        return this.http.get(`/api/search-users/?name=${term}`, this.jwt())
            .map((r: Response) => r.json() as User[])
            .catch((error: any) => {
                this.alertService.error(error || 'Error search users');
                return Observable.throw(error || 'Error search users');
            });
    }

    private jwt() {
        // create authorization header with jwt token
        const userData: any = JSON.parse(localStorage.getItem('currentUser')) || {};
        let currentUser = !!userData.firstName ? userData : null;
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
