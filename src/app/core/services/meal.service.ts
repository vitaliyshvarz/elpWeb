import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class MealService {
    constructor(private http: Http) { }

    public getAll() {
        return this.http.get('/api/meals', this.jwt())
            .map((response: Response) => response.json());
    }

    public getById(id: any) {
        return this.http.get('/api/meals/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    public create(place: any) {
        return this.http.post('/api/meals', place, this.jwt())
            .map((response: Response) => response.json());
    }

    public update(place: any) {
        return this.http.put('/api/meals/' + place.id, place, this.jwt())
            .map((response: Response) => response.json());
    }

    public delete(id: any) {
        return this.http.delete('/api/meals/' + id, this.jwt())
            .map((response: Response) => response.json());
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
