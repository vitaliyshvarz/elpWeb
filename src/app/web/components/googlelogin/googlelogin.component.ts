import { AfterViewInit, Component }             from '@angular/core';
import { AuthenticationService, UserService, AlertService } from '../../../core/@core';
import { ActivatedRoute } from '@angular/router';

declare const gapi: any;

@Component({
    moduleId: module.id,
    selector: 'google-login',
    templateUrl: 'googlelogin.component.html',
    styleUrls: ['googlelogin.component.css']
})

export class GoogleLoginComponent implements AfterViewInit {
    private showSelf: boolean;
    private auth2: any;
    loginButton: any;

    constructor(
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
    ) {
        try {
            this.showSelf = true;
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                this.auth2 = gapi.auth2.init({
                    client_id: '1022163181712-4sunf36ifc0c13l8gt0d7kgc5tpvl66i.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    'ux_mode': 'redirect',
                    // Request scopes in addition to 'profile' and 'email'
                    'scope': 'profile email'
                });

                this.auth2.attachClickHandler('google-signin');
            });
        } catch (err) {
            this.alertService.error('google login unavailbale');
        }
    }

    ngAfterViewInit() {
      this.loginButton = $('#google-signin');

      const scope = this;
      const params = window.location.hash.substr(1);

      if (params.indexOf('id_token') > -1) {

        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
              client_id: '1022163181712-4sunf36ifc0c13l8gt0d7kgc5tpvl66i.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              'ux_mode': 'redirect',
              // Request scopes in addition to 'profile' and 'email'
              'scope': 'profile email'
          }).then((GoogleAuth: any) => {
            const googleUser = GoogleAuth.currentUser.get();
            const userData = {
                email: googleUser.getBasicProfile().getEmail(),
                firstName: googleUser.getBasicProfile().getGivenName(),
                lastName: googleUser.getBasicProfile().getFamilyName(),
                password: googleUser.getBasicProfile().getId(),
                image: googleUser.getBasicProfile().getImageUrl()
            };

            scope.loginInApp(userData);
          }, (error: any) => {
              scope.loginButton.removeClass('sending').blur();
              scope.alertService.error(error.error);
          });
        });
      }
    }

    tryRegisterUser(response: any) {
        response.registrationType = 'google';
        const scope = this;

        this.userService.signup(response)
            .subscribe(
            (data: any) => {
                // set success message and pass true paramater
                // to persist the message after redirecting to the login page
                scope.loginButton.removeClass('sending').blur();
                scope.alertService.success('Registration successful', true);
            },
            (error: any) => {
                scope.loginButton.removeClass('sending').blur();
                scope.alertService.error(error.message);
            });
    }

    loginInApp(user: any) {
        const scope = this;

        this.authenticationService.login(user.email, user.password)
            .subscribe(
            (data: any) => {
                scope.alertService.success('Login successful', true);
                scope.loginButton.removeClass('sending').blur();
            },
            (error: any) => {
                if (error.userRegistered) {
                    scope.alertService.error(`User with email ${user.email} already registred with Facebook or Email`);
                    scope.loginButton.removeClass('sending').blur();
                } else {
                    scope.tryRegisterUser(user);
                }
            });
    }

    onGoogleLoginClick(event: any) {
        event.preventDefault();
        this.loginButton.toggleClass('sending');
    }
}
