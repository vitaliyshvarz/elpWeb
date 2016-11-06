import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { AuthenticationService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})

export class WebLoginFormComponent implements OnInit {
    model: any = {};
    loginButton: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        const context = this;
        new (<any>Foundation.Abide)($('#login-form'), {});
        $('#login-form').on('formvalid.zf.abide', () => context.login());
    }

    login() {
        this.loginButton = $('#login-form').find('[type="submit"]')
            .toggleClass('sending').blur();
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
            (data: any) => {
                this.alertService.success('Login successful', true);
                this.loginButton.removeClass('sending').blur();
            },
            (error: any) => {
                this.alertService.error(error);
                this.loginButton.removeClass('sending').blur();
            });
    }
}
