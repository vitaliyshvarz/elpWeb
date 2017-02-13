import { Component, AfterViewInit, NgZone, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WORKING_DAYS } from '../../../core/@core';

declare var noUiSlider: any;

@Component({
    moduleId: module.id,
    selector: 'working-hours',
    templateUrl: 'working-hours.component.html',
    styleUrls: ['working-hours.component.css']
})

export class WorkingHoursComponent implements AfterViewInit, OnInit {
    workingDays: any = WORKING_DAYS;
    sliders: any = [];
    initialStartMinute: number = 480; // equals 8.00
    initialPauseStartMinute: number = 720; // equals 12.00
    initialEndMinute: number = 1020; // equals 13.00 morning
    initialPauseEndMinute: number = 780; // equals 17.00 morning
    step: number = 15;
    @Input('data') savedPlaceDays: any;


    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {
        // get save data from locale storage if available
        this.initSavedData();
    }

    ngAfterViewInit() {
        // crate sliders for each day
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
        // change slider elements design
        $('.noUi-tooltip').css('font-size', '11px');
        $('.noUi-tooltip').css('padding', '2px');
        $('.noUi-handle').addClass('elp-tooltip');
    }

    /*
    * Add or remove break from day, reinit slider for toogled day
    */
    toogleBreak(day: any) {
        let selected = this.sliders.find((slider: any) => slider.name === day.name);
        selected.slider.noUiSlider.destroy();
        if (!day.hasBreak) {
            this.createDaySliderWithBreak(day);
        } else {
            this.createDefaultDaySlider(day);
        }
        this.changeStyles();
    }

    // Disable, enable day slider
    toogleDayActive(day: any) {
        let selected = this.sliders.find((slider: any) => slider.name === day.name);
        if (day.selected) {
            selected.slider.setAttribute('disabled', true);
        } else {
            selected.slider.removeAttribute('disabled');
        }
    }

    // update day values on slider move
    updateDay(dayName: string, values: any) {
        let selectedDay = this.workingDays.find((day: any) => day.name === dayName);

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

    // Conver value from slider to time
    formatHoursAndMinutes(hours: number, minutes: number) {
        if (hours.toString().length === 1) {
            hours = '0' + hours;
        }
        if (minutes.toString().length === 1) {
            minutes = minutes + '0';
        }
        return hours + ':' + minutes;
    }

    createDefaultDaySlider(day: any) {
        const updateDay = this.updateDay;
        const context = this;
        const businessHoursFrom = +day.business_hours.fromMin || this.initialStartMinute;
        const businessHoursTo = +day.business_hours.toMin || this.initialPauseStartMinute;
        const slider = (<any>document.getElementById(day.name));

        noUiSlider.create(slider, {
            start: [
                businessHoursFrom,
                businessHoursTo
            ],
            connect: [false, true, false],
            tooltips: [
                {
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))
                }, {
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))
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

    createDaySliderWithBreak(day: any) {
        const updateDay = this.updateDay;
        const context = this;
        const businessHoursFrom = +day.business_hours.fromMin || this.initialStartMinute;
        const businessHoursTo = +day.break.fromMin || this.initialPauseStartMinute;
        const breakFrom = +day.break.toMin || this.initialPauseEndMinute;
        const breakTo = +day.business_hours.toMin || this.initialEndMinute;
        const slider = (<any>document.getElementById(day.name));

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
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))
                }, {
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))
                }, {
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))
                }, {
                    to: (value: any) => this.formatHoursAndMinutes(
                        this.convertToHour(parseInt(value, 10)),
                        this.convertToMinute(parseInt(value, 10),
                            this.convertToHour(value)))

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
        const savedDays: any = this.savedPlaceDays || false;
        if (savedDays) {
            this.workingDays = savedDays;
        }
    }
}
