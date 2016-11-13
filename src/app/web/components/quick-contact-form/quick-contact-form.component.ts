import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../core/@core';
import { CommunicationService } from '../../../core/@core';


@Component({
    moduleId: module.id,
    selector: 'quick-contact-form',
    templateUrl: 'quick-contact-form.component.html',
    styleUrls: ['quick-contact-form.component.css']
})

export class QuickContactFormComponent implements OnInit {
    model: any = {};
    private getInTouch: string;
    private success: boolean;
    private error: boolean;
    constructor(
        private _translate: TranslateService,
        private communication: CommunicationService
    ) { }

    sendEmail() {
        this.model.date = new Date();
        this.model.route = window.location.href;
        this.communication.sendQuickEmail(this.model)
            .subscribe(
            value => this.success = true,
            error => this.error = true
            );
    }
    ngOnInit() {
        $.get('http://ipinfo.io', (response: any) => {
            this.model.ip = response.ip;
        }, 'jsonp');

        const context = this;
        new (<any>Foundation.Abide)($('#quickEmail'), {});
        this.getInTouch = this._translate.instant('GET_IN_TOUCH');
        $('#quickEmail').on('formvalid.zf.abide', function() {
            context.sendEmail();
        });
    }


}
