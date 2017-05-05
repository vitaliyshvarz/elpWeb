import { Component }             from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { Location }              from '@angular/common';
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
        private uploadService: UploadService,
        private alertService: AlertService
    ) {
        this.meal = new Meal();
        this.uploadService.progress$.subscribe(
            (data: any) => {
                console.log('progress = ' + data);
            });
    }

    onFileChange(event: any) {
        const files = event.srcElement.files;

        this.uploadService.uploadImage([], files).subscribe((data) => {
            this.meal.imageUrl = data.path;
            let currentPopUp = new (<any>Foundation.Reveal)($('#uploadImageResultModal'));
            currentPopUp.open();
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

        if (!this.checkPortions()) {
          this.alertService.error('Description and Size for each portion are mandatory');
          return;
        }

        this.mealService.create(this.meal)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#createMealResultModal'));
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

    removePortion(index: number): void {
      this.meal.portions.splice(index, 1);
    }

}
