import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';
import { SessionService }                           from '../services/session.service';
import { BACKEND_API }                              from '../config/backendConfig';

@Injectable()
export class MealService {
    constructor(
        private http: Http,
        private alertService: AlertService,
        private sessionService: SessionService) { }

    public getAll() {
        return this.http.get(BACKEND_API.getAllMeals, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error getAll meals');
                return Observable.throw(error.json().message || 'Error getAll meals');
            });
    }

    public getById(id: any) {
        return this.http.get(BACKEND_API.getMealById + id, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error getById meal');
                return Observable.throw(error.json().message || 'Error getById meal');
            });
    }

    public getByIds(ids: [String]) {
        return this.http.get(BACKEND_API.getMealsByIds + ids.join(), this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error getById meal');
                return Observable.throw(error.json().message || 'Error getById meal');
            });
    }

    public create(meal: any) {
        return this.http.post(BACKEND_API.addMeal, meal, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error create meal');
                return Observable.throw(error.json().message || 'Error create meal');
            });
    }

    public update(meal: any) {
        return this.http.put(BACKEND_API.updateMeal + meal._id, meal, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error meal update');
                return Observable.throw(error.json().message || 'Error meal update');
            });
    }

    public delete(id: any) {
        return this.http.delete(BACKEND_API.deleteMeal + id, this.sessionService.addTokenHeader())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error.json().message || 'Error meal delete');
                return Observable.throw(error.json().message || 'Error meal delete');
            });
    }
}
