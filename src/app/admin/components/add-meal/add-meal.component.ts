import { Component }             from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { Location }              from '@angular/common';
import {
    MealService,
    UploadService,
    CURRENCIES,
    Meal,
    Portion
} from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'add-meal',
    templateUrl: 'add-meal.component.html',
    styleUrls: ['add-meal.component.css']
})
export class AddMealComponent {
    meal: Meal;
    currentCurrency: any = CURRENCIES[0]; // USD

    constructor(
        private mealService: MealService,
        private route: ActivatedRoute,
        private location: Location,
        private uploadService: UploadService
    ) {
        this.meal = new Meal();
        this.uploadService.progress$.subscribe(
            (data: any) => {
                console.log('progress = ' + data);
            });
    }

    onFileChange(event: any) {
        const files = event.srcElement.files;

        this.uploadService.uploadImage([], files[0]).subscribe(() => {
            let currentPopUp = new (<any>Foundation.Reveal)($('#uploadImageResultModal'));
            currentPopUp.open();
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.mealService.create(this.meal)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#createMealResultModal'));
                currentPopUp.open();
            });
    }

    addPortion() {
        this.meal.portions.push(new Portion());
    }

}
