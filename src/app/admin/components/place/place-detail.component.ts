import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute, Params }    from '@angular/router';
import { Location }                  from '@angular/common';
import { Place, Meal }               from '../../../core/@core';
import { PlaceService, MealService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-place-detail',
    templateUrl: 'place-detail.component.html',
    styleUrls: ['place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
    place: Place;
    meals: Meal[];

    constructor(
        private mealService: MealService,
        private placeService: PlaceService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.placeService.getById(id).subscribe((data: any) => {
              this.place = data.place;
                this.mealService.getByIds(this.place.mealIds).subscribe((mealData: any) => {
                    this.meals =  mealData.meals;
                });
            });
        });
    }
    goBack(): void {
        this.location.back();
    }

    getMealIds(meals: Meal[]): [string] {
        let ids: any = [];

        meals.forEach(meal => {
            ids.push(meal._id);
        });

        return ids;
    }

    save(): void {
        this.place.mealIds = this.getMealIds(this.meals);
        this.placeService.update(this.place)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#editPlaceResultModal'));
                currentPopUp.open();
            });
    }

}
