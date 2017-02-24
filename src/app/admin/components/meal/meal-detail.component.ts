import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Meal }                     from '../../../core/@core';
import { MealService }              from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-meal-detail',
    templateUrl: 'meal-detail.component.html',
    styleUrls: ['meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
    meal: Meal;

    constructor(
        private mealService: MealService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.mealService.getById(id)
                .subscribe((meal: Meal) => this.meal = meal);
        });
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.mealService.update(this.meal)
            .subscribe(() => {
                let currentPopUp = new Foundation.Reveal($('#editMealResultModal'));
                currentPopUp.open();
            });
    }

}
