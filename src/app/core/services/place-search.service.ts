import { Injectable }                              from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { Place }                                   from '../models/place';
import { AlertService }                            from '../services/alert.service';
import { SessionService }                           from '../services/session.service';
import { BACKEND_API }                              from '../config/backendConfig';

@Injectable()

export class PlaceSearchService {

    constructor(private http: Http,
                private alertService: AlertService,
                private sessionService: SessionService) { }

    search(term: string): Observable<Place[]> {
        return this.http.get(`${BACKEND_API.searchPlaces}?name=${term}`, this.sessionService.addTokenHeader())
            .map((r: Response) => r.json() as Place[])
            .catch((error: any) => {
                this.alertService.error(error || 'Error Place search');
                return Observable.throw(error || 'Error Place search');
            });
    }
}
