import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '@core';
import { PlaceService } from '@core';

@Component({
    moduleId: module.id,
    selector: 'my-places',
    templateUrl: 'places.component.html',
    providers: [PlaceService]
})

export class PlacesComponent implements OnInit {
  places: Place[];
  selectedPlace: Place;

  constructor(
    private placeService: PlaceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getAll()
    .subscribe((places: Place[]) => this.places = places);
  }

  onSelect(place: Place): void {
    this.selectedPlace = place;
  }

  gotoDetail(place: Place): void {
    let link = ['/detail', place.id];
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
