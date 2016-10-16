import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Place } from './place';

import { PlaceService } from '../../services/place.service';

@Component({
  moduleId: module.id,
  selector: 'my-place-detail',
  templateUrl: 'place-detail.component.html',
})
export class PlaceDetailComponent implements OnInit {
  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  place: Place;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.placeService.getPlace(id)
        .then(place => this.place = place);
    });
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.placeService.update(this.place)
      .then(() => this.goBack());
  }

}
