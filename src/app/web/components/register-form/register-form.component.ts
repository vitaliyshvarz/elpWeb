import { Component, OnInit }                from '@angular/core';
import { Router }                           from '@angular/router';
import { UserService, User, AlertService }  from '../../../core/@core';
import { Location }                         from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'register-form',
    templateUrl: 'register-form.component.html'
})

export class WebRegisterFormComponent implements OnInit {
    model: User = new User();
    loginButton: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private location: Location) { }

    ngOnInit() {
        const context = this;
        new (<any>Foundation.Abide)($('#register-form'), {});
        $('#register-form').on('formvalid.zf.abide', () => context.register());
    }

    register() {
        this.model.registrationType = 'email';
        this.loginButton = $('#register-form').find('[type="submit"]')
            .toggleClass('sending').blur();

        if (this.adminAddingUser()) {
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
        } else {
            this.userService.signup(this.model)
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

    adminAddingUser(): boolean {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        return user && user.accountType === 'admin';
    }

    goBack(): void {
        this.location.back();
    }
}
