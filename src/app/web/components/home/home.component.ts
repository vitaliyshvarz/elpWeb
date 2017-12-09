import { Component } from '@angular/core';

declare var $: JQueryStatic;

@Component({
  moduleId: module.id,
  selector: 'web-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class WebHomeComponent {
  constructor() { }

  ngOnInit() {
    /* tslint:disable */
    // hide white background from foundation for video
    $('.off-canvas-content').css('background', 'transparent');
    /* tslint:enable */
  }

}
