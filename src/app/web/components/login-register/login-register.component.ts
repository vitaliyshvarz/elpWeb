import { Component, OnInit }  from '@angular/core';
import { UserService }        from '../../../core/@core';
import { ActivatedRoute }     from '@angular/router';
import { TranslateService }   from '../../../core/@core';
import { LoggedService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    templateUrl: 'login-register.component.html',
    styleUrls: ['login-register.component.css']
})

export class WebLoginRegisterComponent implements OnInit {
    login: boolean;
    showContinueButton: boolean = false;
    isFromAddPlace: boolean = false;
    userNotLogedIn: boolean = true;
    loginRegisterMsg: string;
    currentPopUp: any;

    constructor(
        private loggedService: LoggedService,
        private _translate: TranslateService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.login = true;
        this.userService.registerationSuccess().subscribe(() => {
            this.showContinueButton = true;
        });

        this.loggedService.getLogged().subscribe(logged => {
            this.userNotLogedIn = false;
        });

        this.activatedRoute.params.subscribe(params => {
            this.isFromAddPlace = params['add-place'];
            if (this.isFromAddPlace) {
                this.loginRegisterMsg = this._translate.instant('LOGIN_OR_REGISTER');
                this.openLoginRegisterPopUp();
            }
        });

    }

    openLoginRegisterPopUp() {
        this.currentPopUp = new (<any>Foundation.Reveal)($('#messageModal'));
        this.currentPopUp.open();
    }
}
