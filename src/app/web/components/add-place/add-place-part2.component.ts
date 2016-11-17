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
            this.createDefaultDaySlider(day)
        });
        this.changeStyles();
    }

    changeStyles() {
      $('.noUi-tooltip').css('font-size', '11px');
      $('.noUi-tooltip').css('padding', '2px');
      $('.noUi-handle').addClass( 'elp-tooltip' );
    }

    toogleBreak(day: any) {
      let selected = this.sliders.find((slider:any) => slider.name === day.name);
      selected.slider.noUiSlider.destroy();
      if(day.hasBreak){
        this.createDaySliderWithBreak(day);
      } else {
        this.createDefaultDaySlider(day);
      }
      this.changeStyles();
    }

    createDefaultDaySlider(day: any) {
      let slider = (<any>document.getElementById(day.name));

      noUiSlider.create(slider, {
          start: [8, 18],
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
          console.log(this.target.id, values, handle);
      });
      this.sliders.push({ name: day.name, slider: slider});
    }

    createDaySliderWithBreak(day: any) {
      let slider = (<any>document.getElementById(day.name));

      noUiSlider.create(slider, {
          start: [8, 12, 13, 18],
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
          console.log(this.target.id, values, handle);
      });
      this.sliders.push({ name: day.name, slider: slider});
    }

    goToStep3() {
        this.router.navigate(['/join-us', 'part3']);
    }
}
