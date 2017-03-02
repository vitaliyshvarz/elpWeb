import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'recover-password',
    templateUrl: 'recover-password.component.html',
    styleUrls: ['recover-password.component.css']

})

export class RecoverPasswordComponent implements OnInit {
    model: any = {};
    sendButton: any;

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        const context = this;
        new (<any>Foundation.Abide)($('#recover-password-form'), {});
        $('#recover-password-form').on('formvalid.zf.abide', () => context.send());
    }

    send() {
        this.sendButton = $('#recover-password-form').find('[type="submit"]')
            .toggleClass('recovery-sending').blur();
        this.authenticationService.sendRecoveryPassEmail(this.model.email)
            .subscribe(
            (data: any) => {
                this.alertService.success('Recovery email sent successful', true);
                this.sendButton.removeClass('recovery-sending').blur();
            },
            (error: any) => {
                this.alertService.error(error);
                this.sendButton.removeClass('recovery-sending').blur();
            });
    }
}
