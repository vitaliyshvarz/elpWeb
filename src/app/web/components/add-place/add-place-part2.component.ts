import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PAYMENT_ONTIONS } from '../../../core/@core';
@Component({
    moduleId: module.id,
    selector: 'add-place-part-2',
    templateUrl: 'add-place-part2.component.html',
    styleUrls: ['add-place-part2.component.css']
})

export class AddPlacePart2Component implements OnInit {

    paymentOptions: any = PAYMENT_ONTIONS;

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {

    }
    goToStep3() {
        this.router.navigate(['/join-us', 'part3']);
    }
}
