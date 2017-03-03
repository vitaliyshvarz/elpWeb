import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';

@Injectable()
export class MealService {
    constructor(private http: Http, private alertService: AlertService) { }

    public getAll() {
        return this.http.get('/api/meals', this.jwt())
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error getAll meals');
                return Observable.throw(error || 'Error getAll meals');
            });
    }

    public getById(id: any) {
        return this.http.get('/api/meals/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error getById meal');
                return Observable.throw(error || 'Error getById meal');
            });
    }

    public create(place: any) {
        return this.http.post('/api/meals', place, this.jwt())
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error create meal');
                return Observable.throw(error || 'Error create meal');
            });
    }

    public update(place: any) {
        return this.http.put('/api/meals/' + place.id, place, this.jwt())
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error meal update');
                return Observable.throw(error || 'Error meal update');
            });
    }

    public delete(id: any) {
        return this.http.delete('/api/meals/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error:any) => {
                this.alertService.error(error || 'Error meal delete');
                return Observable.throw(error || 'Error meal delete');
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
