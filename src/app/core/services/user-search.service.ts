import { Injectable }                              from '@angular/core';
import { Http, Response }                          from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../models/user';
import { AlertService }                            from '../services/alert.service';
import { SessionService }                          from '../services/session.service';
import { BACKEND_API }                             from '../config/backendConfig';

@Injectable()

export class UserSearchService {

    constructor(private http: Http,
                private alertService: AlertService,
                private sessionService: SessionService) { }

    search(term: string): Observable<User[]> {
        return this.http.get(`${BACKEND_API.searchUsers}?name=${term}`, this.sessionService.addTokenHeader())
            .map((r: Response) => r.json() as User[])
            .catch((error: any) => {
                this.alertService.error(error || 'Error search users');
                return Observable.throw(error || 'Error search users');
            });
    }
}
