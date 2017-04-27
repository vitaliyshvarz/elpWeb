import { Component, OnInit, Input, AfterViewInit }    from '@angular/core';
import { ActivatedRoute, Params }                       from '@angular/router';
import { Location }                                     from '@angular/common';
import {
    User,
    UserService,
    AlertService,
    AuthenticationService
}  from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
    private user: User;
    private resetPassButton: any;
    private resetPass: any = {
        password: '',
        newpass: ''
    };
    @Input('currentUser') currentUser: boolean;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngAfterViewInit() {
        $('#reset-password-form').hide();
        $('#toogleChangePass').on('click', () => {
            $('#reset-password-form').fadeToggle();
        });
        new (<any>Foundation.Abide)($('#reset-password-form'), {});
        $('#reset-password-form').on('formvalid.zf.abide',
            () => this.resetPassword());
    }

    ngOnInit(): void {
        if (!this.currentUser) {
            this.route.params.forEach((params: Params) => {
                let id = params['id'];
                this.userService.getById(id)
                    .subscribe((data: any) => this.user = data.user);
            });
        } else {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
        }


    }

    resetPassword(): void {
        this.resetPassButton = $('#reset-password-form').find('[type="submit"]')
            .toggleClass('sending').blur();

        this.authenticationService.changePassword(this.resetPass)
            .subscribe(
            (data: any) => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#editPasswordResultModal'));
                currentPopUp.open();
                this.resetPassButton.removeClass('sending').blur();
            },
            (error: any) => {
                this.alertService.error(error);
                this.resetPassButton.removeClass('sending').blur();
            });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.userService.update(this.user)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#editUserResultModal'));
                currentPopUp.open();
            });
    }

}
