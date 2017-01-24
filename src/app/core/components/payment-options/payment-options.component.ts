import { Component, Input, OnInit } from '@angular/core';
import { PAYMENT_ONTIONS } from '../../@core';

declare var noUiSlider: any;

@Component({
    moduleId: module.id,
    selector: 'payment-options',
    templateUrl: 'payment-options.component.html',
    styleUrls: ['payment-options.component.css']
})

export class PaymentOptionsComponent implements OnInit {
    private paymentOptions: any;
    @Input('data') data: any;

    constructor() { }

    ngOnInit() {
        this.paymentOptions = this.data || PAYMENT_ONTIONS;
    }
}
