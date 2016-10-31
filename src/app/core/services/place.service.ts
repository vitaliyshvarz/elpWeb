import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Place } from '../models/place';

@Injectable()
export class PlaceService {

  private placesUrl = 'app/places';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  update(place: Place): Promise<Place> {
    const url = `${this.placesUrl}/${place.id}`;
    return this.http
      .put(url, JSON.stringify(place), {headers: this.headers})
      .toPromise()
      .then(() => place)
      .catch(this.handleError);
  }

  create(name: string): Promise<Place> {
    return this.http
      .post(this.placesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.placesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  getPlaces(): Promise<Place[]> {
    return this.http.get(this.placesUrl)
            .toPromise()
            .then(response => {
              console.log(response);
              return response.json().data as Place[];
            })
            .catch(this.handleError);
  }

  getPlace(id: number): Promise<Place> {
    return this.getPlaces()
               .then(places => places.find(place => place.id === id));
  }
}
