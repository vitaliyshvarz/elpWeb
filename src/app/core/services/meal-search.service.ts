import { Injectable }                              from '@angular/core';
import { Http, Response }                          from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { Meal }                                    from '../models/meal';
import { AlertService }                            from '../services/alert.service';
import { SessionService }                          from '../services/session.service';
import { BACKEND_API }                             from '../config/backendConfig';

@Injectable()

export class MealSearchService {

    constructor(private http: Http,
                private alertService: AlertService,
                private sessionService: SessionService) { }

    search(term: string): Observable<Meal[]> {
        return this.http.get(`${BACKEND_API.searchMeals}?name=${term}`, this.sessionService.addTokenHeader())
            .map((r: Response) => r.json() as Meal[])
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error meal search');
                return Observable.throw(error.json().message || 'Error meal search');
            });
    }
}
