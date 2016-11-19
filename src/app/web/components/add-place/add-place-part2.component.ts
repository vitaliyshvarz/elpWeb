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
    sliders: any = [];

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngAfterViewInit() {
        this.workingDays.forEach((day: any) => {
            if (day.hasBreak) {
                this.createDaySliderWithBreak(day);
            } else {
                this.createDefaultDaySlider(day);
            }
        });
        this.changeStyles();
    }

    changeStyles() {
        $('.noUi-tooltip').css('font-size', '11px');
        $('.noUi-tooltip').css('padding', '2px');
        $('.noUi-handle').addClass('elp-tooltip');
    }

    toogleBreak(day: any) {
        let selected = this.sliders.find((slider: any) => slider.name === day.name);
        selected.slider.noUiSlider.destroy();
        if (day.hasBreak) {
            this.createDaySliderWithBreak(day);
        } else {
            this.createDefaultDaySlider(day);
        }
        this.changeStyles();
    }

    toogleDayActive(day: any) {
        let selected = this.sliders.find((slider: any) => slider.name === day.name);
        if (!day.selected) {
            selected.slider.setAttribute('disabled', true);
        } else {
            selected.slider.removeAttribute('disabled');
        }
    }

    updateDay(dayName: string, values: any) {
        let selectedDay = this.workingDays.find((day: any) => {
            return day.name === dayName
        });

        if (values.length === 4) {
            selectedDay.business_hours.from = values[0];
            selectedDay.business_hours.to = values[3];
            selectedDay.break.from = values[1];
            selectedDay.break.to = values[2];
        } else {
            selectedDay.business_hours.from = values[0];
            selectedDay.business_hours.to = values[1];
        }
    }

    createDefaultDaySlider(day: any) {
        const updateDay = this.updateDay;
        const context = this;
        let slider = (<any>document.getElementById(day.name));

        noUiSlider.create(slider, {
            start: [day.business_hours.from, day.business_hours.to],
            connect: [false, true, false],
            tooltips: true,
            step: 0.5,
            margin: 0,
            range: {
                'min': 0,
                'max': 24
            }
        });
        slider.noUiSlider.on('update', function(values: any, handle: any) {
            updateDay.call(context, this.target.id, values)
        });

        if (!day.selected) {
            slider.setAttribute('disabled', true);
        }

        this.sliders.push({ name: day.name, slider: slider });
    }

    createDaySliderWithBreak(day: any) {
        const updateDay = this.updateDay;
        const context = this;
        let slider = (<any>document.getElementById(day.name));

        noUiSlider.create(slider, {
            start: [
                day.business_hours.from,
                day.break.from,
                day.break.to,
                day.business_hours.to
            ],
            connect: [false, true, false, true, false],
            tooltips: true,
            step: 0.5,
            margin: 0,
            range: {
                'min': 0,
                'max': 24
            }
        });
        slider.noUiSlider.on('update', function(values: any, handle: any) {
            updateDay.call(context, this.target.id, values)
        });
        if (!day.selected) {
            slider.setAttribute('disabled', true);
        }
        this.sliders.push({ name: day.name, slider: slider });
    }

    goToStep3() {
        this.router.navigate(['/join-us', 'part3']);
    }
}
