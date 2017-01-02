import { Component, NgZone } from '@angular/core';

import { AlertService } from '../../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent {
    message: string;

    constructor(
        private alertService: AlertService,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.alertService.getMessage()
            .subscribe((message: string) => {
                this.zone.run(() => {
                    this.message = message;
                    // clear message in 5 seconds
                    setTimeout(() => {
                        this.message = '';
                    }, 10000);
                });
            });
    }
}
