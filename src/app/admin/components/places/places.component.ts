import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '../../../core/@core';
import { PlaceService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-places',
    templateUrl: 'places.component.html',
    providers: [PlaceService]
})

export class PlacesComponent implements OnInit {
    places: Place[];
    selectedPlace: Place;
    currentPopUp: any;

    constructor(
        private placeService: PlaceService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getPlaces();
    }

    private getPlaces(): void {
        this.placeService.getAll()
            .subscribe((places: Place[]) => this.places = places);
    }

    openConfirmPopUp() {
        this.currentPopUp.open();
    }

    onSelect(place: Place): void {
        this.currentPopUp = new Foundation.Reveal($('#deleteModal'));
        this.selectedPlace = place;
    }

    gotoDetail(place: Place): void {
        let link = ['/admin/place-detail', place.id];
        this.router.navigate(link);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.placeService.create(name)
            .subscribe((place: Place) => {
                this.places.push(place);
                this.selectedPlace = null;
            });
    }

    delete(place: Place): void {
        this.placeService
            .delete(place.id)
            .subscribe(() => {
                this.places = this.places.filter(h => h !== place);
                if (this.selectedPlace === place) { this.selectedPlace = null; }
            });
    }

}
