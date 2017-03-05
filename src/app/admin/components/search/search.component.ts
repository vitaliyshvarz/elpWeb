import { Component, OnInit, Input }               from '@angular/core';
import { Router }                                 from '@angular/router';
import { Observable }                             from 'rxjs/Observable';
import { Subject }                                from 'rxjs/Subject';
import {  PlaceSearchService,
    UserSearchService,
    MealSearchService }                           from '../../../core/@core';
import { Place, User, Meal }                      from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl: 'search.component.html',
    providers: [PlaceSearchService, UserSearchService, MealSearchService]
})

export class SearchComponent implements OnInit {
    places: Observable<{}>;
    private searchTerms = new Subject<string>();
    private selectedService: any;
    private selectedModel: any;
    private title: string;
    private searchBy: string;
    private items: any;

    @Input('type') type: string;

    constructor(
        private mealSearchService: MealSearchService,
        private placeSearchService: PlaceSearchService,
        private userSearchService: UserSearchService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.title = this.getTitle(this.type);
        this.searchBy = this.getSearchBy(this.type);
        this.selectedService = this.getService(this.type);
        this.selectedModel = this.getModel(this.type);
        this.items = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap((term: any) => term   // switch to new observable each time
                // return the http search observable
                ? this.selectedService.search(term)
                // or the observable of empty items if no search term

                : /* tslint:disable */ Observable.of([])/* tslint:enable */
            )
            .catch((error: any) => {
                // TODO: real error handling
                console.log(error);

                return /* tslint:disable */Observable.of([]); /* tslint:enable */

            });
    }

    private getModel(type: string): any {
        switch (type) {
            case 'users':
                return User;
            case 'places':
                return Place;
            case 'meals':
                return Meal;
            default:
        }
    }

    private getService(type: string): any {
        switch (type) {
            case 'users':
                return this.userSearchService;
            case 'places':
                return this.placeSearchService;
            case 'meals':
                return this.mealSearchService;
            default:
        }
    }

    private getSearchBy(type: string): string {
        switch (type) {
            case 'users':
                return 'User name';
            case 'places':
                return 'Place name';
            case 'meals':
                return 'Meal name';
            default:
        }
    }

    private getTitle(type: string): string {
        switch (type) {
            case 'users':
                return 'User Search';
            case 'places':
                return 'Place Search';
            case 'meals':
                return 'Meal Search';
            default:
        }
    }
    gotoDetail(item: Place | User): void {
        let type: string;
        switch (this.type) {
            case 'users':
                type = 'user';
                break;
            case 'places':
                type = 'place';
                break;
            case 'meals':
                type = 'meal';
                break;
            default:
        }
        const link = [`/admin/${type}-detail`, item.id];
        this.router.navigate(link);
    }
}
