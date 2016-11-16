import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PAYMENT_ONTIONS, WORKING_DAYS } from '../../../core/@core';

declare var noUiSlider: any;

@Component({
    moduleId: module.id,
    selector: 'add-place-part-2',
    templateUrl: 'add-place-part2.component.html',
    styleUrls: ['add-place-part2.component.css']
})

export class AddPlacePart2Component implements AfterViewInit {

    paymentOptions: any = PAYMENT_ONTIONS;
    workingDays: any = WORKING_DAYS;

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngAfterViewInit() {
      this.workingDays.forEach((day: any) => this.createDaySlider(day));
    }

    createDaySlider(day:any) {
      var connectSlider2 = document.getElementById(day.name);

      noUiSlider.create(connectSlider2, {
      	start: [8, 12, 13, 18],
      	connect: [false, true, false, true, false],
        tooltips: true,
        step: 1,
        margin: 0,
      	range: {
      	  'min': 0,
      	  'max': 24
      	},
        pips: {
      		mode: 'values',
      		density: 4
      	}
      });
    }

    goToStep3() {
        this.router.navigate(['/join-us', 'part3']);
    }
}
