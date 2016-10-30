import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;

@Component({
  moduleId: module.id,
  selector: 'web-home',
  templateUrl:'home.component.html',
  styleUrls: ['home.component.css']
})

export class WebHomeComponent implements OnInit {

  ngOnInit() {
    /* tslint:disable */
    // hide white background from foundation for video
    $('.off-canvas-content').css('background', 'transparent');
    /* tslint:enable */
  }

}
