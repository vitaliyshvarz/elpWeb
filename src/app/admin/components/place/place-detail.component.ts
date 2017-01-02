import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Place }                    from '../../../core/@core';
import { PlaceService }             from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-place-detail',
    templateUrl: 'place-detail.component.html',
})
export class PlaceDetailComponent implements OnInit {
    place: Place;

    constructor(
        private placeService: PlaceService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.placeService.getById(id)
                .subscribe((place: Place) => this.place = place);
        });
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.placeService.update(this.place)
            .subscribe(() => this.goBack());
    }

}
