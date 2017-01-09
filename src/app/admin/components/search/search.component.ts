import { Component, OnInit, Input }               from '@angular/core';
import { Router }                                 from '@angular/router';
import { Observable }                             from 'rxjs/Observable';
import { Subject }                                from 'rxjs/Subject';
import { PlaceSearchService, UserSearchService }  from '../../../core/@core';
import { Place, User }                            from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl: 'search.component.html',
    providers: [PlaceSearchService, UserSearchService]
})

export class SearchComponent implements OnInit {
    places: Observable<{}>;
    private searchTerms = new Subject<string>();
    private selectedService: any;
    private selectedModel: any;
    private title: string;
    private searchBy: string;

    @Input('type') type: string;

    constructor(
        private placeSearchService: PlaceSearchService,
        private userSearchService: UserSearchService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.title = this.type === 'users' ? 'User Search' : 'Place Search';
        this.searchBy = this.type === 'users' ? 'User name' : 'Place name';
        this.selectedService = this.type === 'users' ? this.userSearchService : this.placeSearchService;
        this.selectedModel = this.type === 'users' ? User : Place;
        this.items = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.selectedService.search(term)
                // or the observable of empty items if no search term
                : Observable.of<this.selectedModel[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<this.selectedModel[]>([]);
            });
    }

    gotoDetail(item: Place): void {
        let link = ['/admin/detail', item.id];
        this.router.navigate(link);
    }
}
