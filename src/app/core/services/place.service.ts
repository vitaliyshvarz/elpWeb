import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class PlaceService {
    constructor(private http: Http) { }

    public getAll() {
        return this.http.get('/api/places', this.jwt())
            .map((response: Response) => response.json());
    }

    public getAllForUser(email: string) {
        return this.http.get(`/api/place-by-email/?email=${email}`, this.jwt())
            .map((response: Response) => response.json());
    }
    public getById(id: any) {
        return this.http.get('/api/places/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    public create(place: any) {
        return this.http.post('/api/places', place, this.jwt())
            .map((response: Response) => response.json());
    }

    public update(place: any) {
        return this.http.put('/api/places/' + place.id, place, this.jwt())
            .map((response: Response) => response.json());
    }

    public delete(id: any) {
        return this.http.delete('/api/places/' + id, this.jwt())
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
