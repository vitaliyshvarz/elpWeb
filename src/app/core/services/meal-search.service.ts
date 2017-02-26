import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs';
import { Meal }                                   from '../models/meal';

@Injectable()

export class MealSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Meal[]> {
        return this.http.get(`/api/search-meals/?name=${term}`, this.jwt())
            .map((r: Response) => r.json() as Meal[]);
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
