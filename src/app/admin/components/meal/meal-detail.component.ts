import { Component, OnInit }             from '@angular/core';
import { ActivatedRoute, Params }        from '@angular/router';
import { Location }                      from '@angular/common';
import { MealService, UploadService, CURRENCIES, Meal } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-meal-detail',
    templateUrl: 'meal-detail.component.html',
    styleUrls: ['meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
    meal: Meal;
    currentCurrency: any = CURRENCIES[0]; // USD

    constructor(
        private mealService: MealService,
        private route: ActivatedRoute,
        private location: Location,
        private uploadService: UploadService
    ) {
        this.uploadService.progress$.subscribe(
            (data: any) => {
                console.log('progress = ' + data);
            });
    }

    onFileChange(event: any) {
        console.log('onChange');
        const files = event.srcElement.files;
        console.log(files);
        this.uploadService.uploadImage([], files).subscribe(() => {
            let currentPopUp = new (<any>Foundation.Reveal)($('#uploadImageResultModal'));
            currentPopUp.open();
        });
    }

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

                let currentPopUp = new (<any>Foundation.Reveal)($('#editMealResultModal'));
                currentPopUp.open();
            });
    }

}
