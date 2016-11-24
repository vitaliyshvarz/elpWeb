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
    initialStartMinute: number = 480;
    initialPauseStartMinute: number = 720,
    initialEndMinute: number = 1020;
    initialPauseEndMinute: number = 780;
    step: number = 30;

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngAfterViewInit() {
        this.initSavedData();
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
            selectedDay.business_hours.fromMin = values[0];
            selectedDay.business_hours.from =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[0]),
                    this.convertToMinute(values[0], this.convertToHour(values[0]))
                );
            selectedDay.business_hours.toMin = values[3];
            selectedDay.business_hours.to =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[3]),
                    this.convertToMinute(values[3], this.convertToHour(values[3]))
                );
            selectedDay.break.fromMin = values[1];
            selectedDay.break.from =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[1]),
                    this.convertToMinute(values[1], this.convertToHour(values[1]))
                );
            selectedDay.break.toMin = values[2];
            selectedDay.break.to =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[2]),
                    this.convertToMinute(values[2], this.convertToHour(values[2]))
                );
        } else {
            selectedDay.business_hours.fromMin = values[0];
            selectedDay.business_hours.from =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[0]),
                    this.convertToMinute(values[0], this.convertToHour(values[0]))
                );
            selectedDay.business_hours.toMin = values[1];
            selectedDay.business_hours.to =
                this.formatHoursAndMinutes(
                    this.convertToHour(values[1]),
                    this.convertToMinute(values[1], this.convertToHour(values[1]))
                );
        }
    }

    convertToHour(value: number) {
        return Math.floor(value / 60);
    }

    convertToMinute(value: number, hour: number) {
        return value - hour * 60;
    }

    formatHoursAndMinutes(hours: number, minutes: number) {
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
        if (hours.toString().length == 1) hours = '0' + hours;
        if (minutes.toString().length == 1) minutes = minutes + '0';

        return hours + ':' + minutes;
    }

    filterTooltip(value: any) {
        return this.formatHoursAndMinutes(
            this.convertToHour(value),
            this.convertToMinute(value, this.convertToHour(value))
        )
    }

    createDefaultDaySlider(day: any) {
        const updateDay = this.updateDay;
        const context = this;
        const businessHoursFrom = +day.business_hours.fromMin || this.initialStartMinute;
        const businessHoursTo = +day.business_hours.toMin || this.initialPauseStartMinute;
        let slider = (<any>document.getElementById(day.name));

        noUiSlider.create(slider, {
            start: [
                businessHoursFrom,
                businessHoursTo
            ],
            connect: [false, true, false],
            tooltips: [
                {
                    to: this.filterTooltip
                }, {
                    to: this.filterTooltip
                }],
            step: this.step,
            margin: 0,
            range: {
                'min': 0,
                'max': 1440
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
        const businessHoursFrom = +day.business_hours.fromMin || this.initialStartMinute;
        const businessHoursTo = +day.break.fromMin || this.initialPauseStartMinute;
        const breakFrom = +day.break.toMin || this.initialPauseEndMinute;
        const breakTo = +day.business_hours.toMin || this.initialEndMinute;
        let slider = (<any>document.getElementById(day.name));

        noUiSlider.create(slider, {
            start: [
                businessHoursFrom,
                businessHoursTo,
                breakFrom,
                breakTo
            ],
            connect: [false, true, false, true, false],
            tooltips: [
                {
                    to: this.filterTooltip
                }, {
                    to: this.filterTooltip
                }, {
                    to: this.filterTooltip
                }, {
                    to: this.filterTooltip
                }],
            step: this.step,
            margin: 0,
            range: {
                'min': 0,
                'max': 1440
            }
        });
        slider.noUiSlider.on('update', function(values: any, handle: any) {
            updateDay.call(context, this.target.id, values);
        });
        if (!day.selected) {
            slider.setAttribute('disabled', true);
        }

        this.sliders.push({ name: day.name, slider: slider });
    }

    initSavedData() {
        const savedPlace: any = localStorage.getItem('currentWorkingDays') || false;
        console.log(JSON.parse(savedPlace));
        if (savedPlace) {
            this.workingDays = JSON.parse(savedPlace);
        }
    }
    goToStep3() {

        localStorage.setItem('currentWorkingDays', JSON.stringify(this.workingDays));
        this.router.navigate(['/join-us', 'part3']);
    }
}
