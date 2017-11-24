import { Component }             from '@angular/core';
import { AuthenticationService, UserService, AlertService } from '../../../core/@core';

declare const gapi: any;

@Component({
    moduleId: module.id,
    selector: 'google-login',
    templateUrl: 'googlelogin.component.html',
    styleUrls: ['googlelogin.component.css']
})

export class GoogleLoginComponent {
    private showSelf: boolean;
    private auth2: any;
    loginButton: any;

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService
    ) {
        try {
            this.showSelf = true;
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                this.auth2 = gapi.auth2.init({
                    client_id: '1034471759698-p8lgrhmelrqc0v8r3ahukgvgro5ko97t.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    // Request scopes in addition to 'profile' and 'email'
                    'scope': 'profile email'
                });

                this.auth2.attachClickHandler('google-signin', {},
                    (googleUser: any) => {
                        const userData = {
                            email: googleUser.getBasicProfile().getEmail(),
                            firstName: googleUser.getBasicProfile().getGivenName(),
                            lastName: googleUser.getBasicProfile().getFamilyName(),
                            password: googleUser.getBasicProfile().getId(),
                            image: googleUser.getBasicProfile().getImageUrl()
                        };
                        this.loginInApp(userData);
                    }, (error: any) => {
                        this.loginButton.removeClass('sending').blur();
                        this.alertService.error(error);
                    }
                );
            });
        } catch (err) {
            this.alertService.error('google login unavailbale');
        }
    }

    tryRegisterUser(response: any) {
        response.registrationType = 'google';
        this.userService.signup(response)
            .subscribe(
            (data: any) => {
                // set success message and pass true paramater
                // to persist the message after redirecting to the login page
                this.loginButton.removeClass('sending').blur();
                this.alertService.success('Registration successful', true);
            },
            (error: any) => {
                this.loginButton.removeClass('sending').blur();
                this.alertService.error(error);
            });
    }

    loginInApp(user: any) {
        this.authenticationService.login(user.email, user.password)
            .subscribe(
            (data: any) => {
                this.alertService.success('Login successful', true);
                this.loginButton.removeClass('sending').blur();
            },
            (error: any) => {
                if (error.userRegistered) {
                    this.alertService.error(`User with email ${user.email} already registred with Facebook or Email`);
                    this.loginButton.removeClass('sending').blur();
                } else {
                    this.tryRegisterUser(user);
                }
            });
    }

    onGoogleLoginClick(event: any) {
        event.preventDefault();
        this.loginButton = $('#google-signin').toggleClass('sending');
    }
}
