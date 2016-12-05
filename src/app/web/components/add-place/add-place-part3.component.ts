import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DISHES, CURRENCIES } from '../../../core/@core';
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
    constructor(
        private zone: NgZone,
        private router: Router,
        private alertService: AlertService
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
        const savedPlace: any = localStorage.getItem('currentPlace') || false;
        const savedPayments: any = localStorage.getItem('currentPaymentOptions') || false;
        const savedDays: any = localStorage.getItem('currentWorkingDays') || false;

        if (!savedPlace) {
            this.alertService.error('No Place selected, please select place');
        }
        if (!savedPayments) {
            this.alertService.error('No payment options selected, please payment options');
        }
        if (!savedDays) {
            this.alertService.error('No working hours selected, please select working hours');
        }

    }
}
