import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { Subject }            from 'rxjs/Subject';
import { PlaceSearchService } from '@core';
import { Place }              from '@core';

@Component({
  moduleId: module.id,
  selector: 'place-search',
  templateUrl: 'place-search.component.html',
  providers: [PlaceSearchService]
})

export class PlaceSearchComponent implements OnInit {
  places: Observable<{}>;
  private searchTerms = new Subject<string>();

  constructor(
    private placeSearchService: PlaceSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.places = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.placeSearchService.search(term)
        // or the observable of empty places if no search term
        : Observable.of<Place[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Place[]>([]);
      });
  }

  gotoDetail(place: Place): void {
    let link = ['/detail', place.id];
    this.router.navigate(link);
  }
}
