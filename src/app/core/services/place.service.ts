import { Injectable }                              from '@angular/core';
import { Http, Response }                          from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';
import { SessionService }                          from '../services/session.service';
import { BACKEND_API }                             from '../config/backendConfig';
import { Place }                                   from '../models/place';

@Injectable()
export class PlaceService {
    constructor(private http: Http,
        private alertService: AlertService,
        private sessionService: SessionService) { }

    public getAll() {
        return this.http.get(BACKEND_API.getAllPlaces, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getAll places');
                return Observable.throw(error || 'Error getAll places');
            });
    }

    public getAllForUser() {
        return this.http.get(BACKEND_API.userPlaces, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getAllForUser places');
                return Observable.throw(error || 'Error getAllForUser places');
            });
    }
    public getById(id: any) {
        return this.http.get(BACKEND_API.getPlaceById + id, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getById places');
                return Observable.throw(error || 'Error getById places');
            });
    }

    public create(place: Place) {
        return this.http.post(BACKEND_API.addPlace, place, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error create places');
                return Observable.throw(error || 'Error create places');
            });
    }

    public update(place: Place) {
        return this.http.put(BACKEND_API.updatePlace + place._id, place, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error update places');
                return Observable.throw(error || 'Error update places');
            });
    }

    public delete(id: any) {
        return this.http.delete(BACKEND_API.deletePlace + id, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error delete places');
                return Observable.throw(error || 'Error delete places');
            });
    }
}
