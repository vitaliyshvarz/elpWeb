import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import { Place }          from '../models/place';

@Injectable()

export class PlaceSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Place[]> {
        return this.http.get(`/api/search-places/?name=${term}`)
            .map((r: Response) => r.json().data as Place[]);
    }
}
