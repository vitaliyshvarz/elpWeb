import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'add-place-part-3',
    templateUrl: 'add-place-part3.component.html',
    styleUrls: ['add-place-part3.component.css']
})

export class AddPlacePart3Component implements OnInit {

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    ngOnInit() {

    }
    finish() {

    }
}
