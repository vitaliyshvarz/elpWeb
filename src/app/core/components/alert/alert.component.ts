import { Component, NgZone, OnInit } from '@angular/core';

import { AlertService } from '../../../core/@core';
import { AuthenticationService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {
    private message: any;
    private showLogInBnt: boolean;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.alertService.getMessage()
            .subscribe((message: any) => {
                this.zone.run(() => {
                  this.message = message;

                  if (message) {
                    setTimeout(() => {
                      $('html, body').animate({ scrollTop: 0 }, 2000);
                    }, 100);
                  }

                  if (message && message.text === 'Session expired') {
                    this.authenticationService.logout(false);
                    this.showLogInBnt = true;
                  }
                });
            });
    }
}
