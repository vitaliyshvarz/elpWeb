import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs';
import { User }                                    from '../models/user';

@Injectable()

export class UserSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Place[]> {
        return this.http.get(`/api/search-users/?name=${term}`, this.jwt())
            .map((r: Response) => r.json() as User[]);
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
