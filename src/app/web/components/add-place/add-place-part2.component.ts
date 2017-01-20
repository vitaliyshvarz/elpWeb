import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAYMENT_ONTIONS, WORKING_DAYS } from '../../../core/@core';

declare var noUiSlider: any;

@Component({
    moduleId: module.id,
    selector: 'add-place-part-2',
    templateUrl: 'add-place-part2.component.html',
    styleUrls: ['add-place-part2.component.css']
})

export class AddPlacePart2Component implements OnInit {
    paymentOptions: any = PAYMENT_ONTIONS;
    workingDays: any = WORKING_DAYS;
    savedPlace: any = JSON.parse(localStorage.getItem('currentPlace')) || false;

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        // get save data from locale storage if available
        this.initSavedData();

        if (!this.savedPlace) {
            this.router.navigate(['/join-us', 'part1']);
        }
    }

    initSavedData() {
        const savedPayments: any = localStorage.getItem('currentPaymentOptions') || false;
        const savedDays: any = localStorage.getItem('currentWorkingDays') || false;
        if (savedDays) {
            this.workingDays = JSON.parse(savedDays);
        }
        if (savedPayments) {
            this.paymentOptions = JSON.parse(savedPayments);
        }
    }

    goToStep3() {
        localStorage.setItem('currentPaymentOptions', JSON.stringify(this.paymentOptions));
        localStorage.setItem('currentWorkingDays', JSON.stringify(this.workingDays));
        this.router.navigate(['/join-us', 'part3']);
    }
}
