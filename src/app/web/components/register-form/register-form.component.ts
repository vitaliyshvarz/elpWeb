import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/@core';
import { AlertService } from '../../services/alert.service';


@Component({
    moduleId: module.id,
    selector: 'register-form',
    templateUrl: 'register-form.component.html'
})

export class WebRegisterFormComponent implements OnInit {
    model: any = {};
    loginButton: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        const context = this;
        new (<any>Foundation.Abide)($('#register-form'), {});
        $('#register-form').on('formvalid.zf.abide', () => context.register());
    }

    register() {
        this.model.registrationType = 'email';
        this.loginButton = $('#register-form').find('[type="submit"]')
            .toggleClass('sending').blur();
        this.userService.create(this.model)
            .subscribe(
            (data: any) => {
                // set success message and pass true paramater
                // to persist the message after redirecting to the login page
                this.alertService.success('Registration successful', true);
                this.loginButton.removeClass('sending').blur();
            },
            (error: any) => {
                this.alertService.error(error);
                this.loginButton.removeClass('sending').blur();
            });
    }
}
