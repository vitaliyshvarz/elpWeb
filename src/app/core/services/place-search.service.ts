import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { Place }                                   from '../models/place';
import { AlertService }                            from '../services/alert.service';


@Injectable()

export class PlaceSearchService {

    constructor(private http: Http, private alertService: AlertService) { }

    search(term: string): Observable<Place[]> {
        return this.http.get(`/api/search-places/?name=${term}`, this.jwt())
            .map((r: Response) => r.json() as Place[])
            .catch((error:any) => {
                this.alertService.error(error || 'Error Place search');
                return Observable.throw(error || 'Error Place search');
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
