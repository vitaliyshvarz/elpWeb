import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService, DISHES, CURRENCIES } from '../../../core/@core';
import { AlertService } from '../../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'add-place-part-3',
    templateUrl: 'add-place-part3.component.html',
    styleUrls: ['add-place-part3.component.css']
})

export class AddPlacePart3Component implements OnInit {

    currentCurrency: any = CURRENCIES[0]; // USD
    currencies: any = CURRENCIES;
    dishes: any = DISHES;
    deliveryAvailable: boolean = false;
    takeAwayAvailable: boolean = false;

    constructor(
        private zone: NgZone,
        private router: Router,
        private alertService: AlertService,
        private placeService: PlaceService
    ) { }

    selectCurrency(currency) {
        this.currentCurrency = currency;
    }
    isCurrentCurrency(currency) {
        return this.currentCurrency.name === currency.name;
    }

    toogleDetails(id) {
        $(`#${id}details`).slideToggle('slow');
    }

    ngOnInit() { }

    finish() {
        const savedPlace: any = JSON.parse(localStorage.getItem('currentPlace')) || false;
        const savedPayments: any = JSON.parse(localStorage.getItem('currentPaymentOptions')) || false;
        const savedDays: any = JSON.parse(localStorage.getItem('currentWorkingDays')) || false;
        const activeMeals = this.dishes.filter(dish => !!dish.selected);
        const currency = this.currentCurrency;
        let valid: boolean = true;

        if (!savedPlace) {
            this.alertService.error('No Place selected, please select place');
            valid = false;
        }
        if (!savedPayments) {
            this.alertService.error('No payment options selected, please payment options');
            valid = false;
        }
        if (!savedDays) {
            this.alertService.error('No working hours selected, please select working hours');
            valid = false;
        }
        if (activeMeals.length === 0) {
            this.alertService.error('No meals selected, please select at least one meal');
            valid = false;
        }

        if (valid) {
            this.finishAddPlaceButton = $('#finishAddPlace').toggleClass('sending');
            this.placeService.create({
                name: savedPlace.name,
                id: savedPlace.place_id,
                location: savedPlace.geometry.location,
                phone: savedPlace.international_phone_number,
                elp_opening_hours: savedDays,
                rating: savedPlace.rating || '',
                fullAddress: savedPlace.vicinity || '',
                website: savedPlace.website || '',
                address_components: savedPlace.address_components,
                payment_options: savedPayments,
                meals: activeMeals,
                currency: currency,
                deliveryAvailable: this.deliveryAvailable,
                takeAwayAvailable: this.takeAwayAvailable
            }).subscribe(
                (data: any) => {
                    localStorage.removeItem('currentPlace');
                    localStorage.removeItem('currentPaymentOptions');
                    localStorage.removeItem('currentWorkingDays');
                    this.finishAddPlaceButton.removeClass('sending').blur();
                    this.alertService.success('Place has been added!', true);
                },
                (error: any) => {
                    this.finishAddPlaceButton.removeClass('sending').blur();
                    this.alertService.error(error);
                });
        }

    }
}
