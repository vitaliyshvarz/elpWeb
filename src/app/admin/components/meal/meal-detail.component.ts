import { Component, OnInit }             from '@angular/core';
import { ActivatedRoute, Params }        from '@angular/router';
import { Location }                      from '@angular/common';
import {
    MealService,
    UploadService,
    CURRENCIES,
    Meal,
    Portion,
    AlertService
} from '../../../core/@core';

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
        private uploadService: UploadService,
        private alertService: AlertService
    ) {
        this.uploadService.progress$.subscribe(
            (data: any) => {
                console.log('progress = ' + data);
            });
    }

    onFileChange(event: any) {
        const files = event.srcElement.files;

        this.uploadService.uploadImage([], files).subscribe(data => {
            this.meal.imageUrl = data.path;
            let currentPopUp = new (<any>Foundation.Reveal)($('#uploadImageResultModal'));
            currentPopUp.open();
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.mealService.getById(id)
                .subscribe((data: any) => this.meal = data.meal);
        });
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {

        if (!this.meal.imageUrl) {
            this.alertService.error('No Image, please select image');
            return;
        }
        if (!this.meal.name) {
            this.alertService.error('No name, please enter meal name');
            return;
        }
        if (!this.meal.description) {
            this.alertService.error('No description, please enter meal description');
            return;
        }
        if (this.meal.portions.length === 0) {
            this.alertService.error('No portions added, please add portions');
            return;
        }

        if (!this.checkPortions() ) {
          this.alertService.error('Description and Size for each portion are mandatory');
          return;
        }

        this.mealService.update(this.meal)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#editMealResultModal'));
                currentPopUp.open();
            });
    }

    checkPortions(): boolean {
      let result = true;
      this.meal.portions.forEach(portion => {
        if (portion.description.length < 1) {
          result = false;
        }

        if (portion.size.length < 1) {
          result = false;
        }
      });

      return result;
    }

    addPortion(): void {
        this.meal.portions.push(new Portion());
    }

}
