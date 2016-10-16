import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '../place/place';
import { PlaceService } from '../../services/place.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',

})
export class DashboardComponent implements OnInit{
  places: Place[] = [];

  constructor(
    private router: Router,
    private placeService: PlaceService) {
  }
  ngOnInit():void {
    this.placeService.getPlaces()
      .then(places => this.places = places.slice(1,5))
  }

  gotoDetail(place: Place): void {
    let link = ['/detail', place.id];
    this.router.navigate(link);
  }
}
