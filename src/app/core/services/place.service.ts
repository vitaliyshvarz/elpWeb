import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';

@Injectable()
export class PlaceService {
    constructor(private http: Http, private alertService: AlertService) { }

    public getAll() {
        return this.http.get('/api/places', this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getAll places');
                return Observable.throw(error || 'Error getAll places');
            });
    }

    public getAllForUser(email: string) {
        return this.http.get(`/api/place-by-email/?email=${email}`, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getAllForUser places');
                return Observable.throw(error || 'Error getAllForUser places');
            });
    }
    public getById(id: any) {
        return this.http.get('/api/places/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getById places');
                return Observable.throw(error || 'Error getById places');
            });
    }

    public create(place: any) {
        return this.http.post('/api/places', place, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error create places');
                return Observable.throw(error || 'Error create places');
            });
    }

    public update(place: any) {
        return this.http.put('/api/places/' + place.id, place, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error update places');
                return Observable.throw(error || 'Error update places');
            });
    }

    public delete(id: any) {
        return this.http.delete('/api/places/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error delete places');
                return Observable.throw(error || 'Error delete places');
            });
    }

    // private helper methods
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
