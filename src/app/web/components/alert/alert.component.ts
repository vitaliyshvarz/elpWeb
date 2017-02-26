import { Component, NgZone, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {
    private message: any;
    private timeout: any;

    constructor(
        private alertService: AlertService,
        private zone: NgZone
    ) { }

    private registerListener(): void {
        const scope = this;
        this.timeout = setTimeout(function() {
            if (scope.message && scope.message.text && scope.message.text.length) {
                scope.message = '';
            }
        }, 10000);

    }

    ngOnInit() {
        this.alertService.getMessage()
            .subscribe((message: string) => {
                clearTimeout(this.timeout);
                this.registerListener();
                this.zone.run(() => this.message = message);
            });
    }
}
