import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import { Place }          from '../components/place/place';
@Injectable()
export class PlaceSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Place[]> {
    return this.http
               .get(`app/places/?name=${term}`)
               .map((r: Response) => r.json().data as Place[]);

  }
}
