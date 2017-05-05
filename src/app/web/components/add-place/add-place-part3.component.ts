import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
    PlaceService,
    MealService,
    CURRENCIES,
    Meal, Place,
    AlertService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'add-place-part-3',
    templateUrl: 'add-place-part3.component.html',
    styleUrls: ['add-place-part3.component.css']
})

export class AddPlacePart3Component implements OnInit {
    saveResultPlace: any;
    finishAddPlaceButton: any;
    currentCurrency: any = CURRENCIES[0]; // USD
    currencies: any = JSON.parse(JSON.stringify(CURRENCIES));
    meals: Meal[];
    deliveryAvailable: boolean = false;
    takeAwayAvailable: boolean = false;
    showSaveSucess: boolean = false;
    savedPlace: any = JSON.parse(localStorage.getItem('currentPlace')) || false;
    savedPayments: any = JSON.parse(localStorage.getItem('currentPaymentOptions')) || false;
    savedDays: any = JSON.parse(localStorage.getItem('currentWorkingDays')) || false;
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || false;

    constructor(
        private zone: NgZone,
        private router: Router,
        private alertService: AlertService,
        private placeService: PlaceService,
        private mealService: MealService
    ) { }

    toogleDetails(id: string | number) {
        $(`#${id}details`).slideToggle('slow');
    }

    ngOnInit() {
        this.loadAllMeals();
        if (!this.savedPlace) {
            this.router.navigate(['/join-us', 'part1']);
        } else if (!this.savedPayments || !this.savedDays) {
            this.router.navigate(['/join-us', 'part2']);
        }
    }

    // initially get meals
    private loadAllMeals(): void {
        this.mealService.getAll().subscribe((meals: Meal[]) => this.meals = meals);
    }

    finish() {
        const activeMeals = this.meals.filter(dish => !!dish.selected);
        const currency = this.currentCurrency;
        let valid: boolean = true;

        if (!this.savedPlace) {
            this.alertService.error('No Place selected, please select place');
            valid = false;
        }
        if (!this.savedPayments) {
            this.alertService.error('No payment options selected, please payment options');
            valid = false;
        }
        if (!this.savedDays) {
            this.alertService.error('No working hours selected, please select working hours');
            valid = false;
        }
        if (activeMeals.length === 0) {
            this.alertService.error('No meals selected, please select at least one meal');
            valid = false;
        }

        if (!this.currentUser) {
            this.alertService.error('Please Log in');
            valid = false;
        }

        if (valid) {
            this.finishAddPlaceButton = $('#finishAddPlace').toggleClass('sending');
            this.placeService.create(new Place({
                name: this.savedPlace.name,
                googleId: this.savedPlace.place_id,
                location: this.savedPlace.geometry.location,
                phone: this.savedPlace.international_phone_number,
                elpOpeningHours: this.savedDays,
                rating: this.savedPlace.rating || '',
                fullAddress: this.savedPlace.vicinity || '',
                website: this.savedPlace.website || '',
                paymentOptions: this.savedPayments,
                meals: this.getSelectedMeals(this.meals),
                currency: currency,
                deliveryAvailable: this.deliveryAvailable,
                takeAwayAvailable: this.takeAwayAvailable,
            })).subscribe(
                (data: any) => {
                    this.saveResultPlace = data.place;
                    this.showSucessBlock();
                    localStorage.removeItem('currentPlace');
                    localStorage.removeItem('currentPaymentOptions');
                    localStorage.removeItem('currentWorkingDays');
                    this.finishAddPlaceButton.removeClass('sending').blur();
                    this.alertService.success('Place has been added!', true);
                    this.loadAllMeals();
                },
                (error: any) => {
                    this.finishAddPlaceButton.removeClass('sending').blur();
                    this.alertService.error(error);
                });
        }

    }



    getSelectedMeals(meals: Meal[]): Meal[] {
      console.log(meals.filter(meal => meal.selected));
        return meals.filter(meal => meal.selected);
    }

    showSucessBlock() {
        this.showSaveSucess = true;
    }

    goToEditPlace() {
        let link = ['/admin/place-detail', this.saveResultPlace._id];
        this.router.navigate(link);
    }

}
