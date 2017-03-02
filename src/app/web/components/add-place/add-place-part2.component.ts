import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAYMENT_ONTIONS, WORKING_DAYS } from '../../../core/@core';
import { AlertService } from '../../../core/@core';

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
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        // get save data from locale storage if available
        this.initSavedData();

        if (!this.savedPlace) {
            this.router.navigate(['/join-us', 'part1']);
        }
    }

    initSavedData(): void {
        const savedPayments: any = localStorage.getItem('currentPaymentOptions') || false;
        const savedDays: any = localStorage.getItem('currentWorkingDays') || false;
        if (savedDays) {
            this.workingDays = JSON.parse(savedDays);
        }
        if (savedPayments) {
            this.paymentOptions = JSON.parse(savedPayments);
        }
    }

    private noPaymentsSelected(): boolean {
        return !!(this.paymentOptions.filter((option: any) =>
            !!option.selected)).length;
    }

    goToStep3(): void {

        if (!this.noPaymentsSelected()) {
            this.alertService.error('No payment options selected!');
            return;
        }

        localStorage.setItem('currentPaymentOptions', JSON.stringify(this.paymentOptions));
        localStorage.setItem('currentWorkingDays', JSON.stringify(this.workingDays));
        this.router.navigate(['/join-us', 'part3']);
    }
}
