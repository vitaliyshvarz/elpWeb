import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import {
    User,
    TranslateService,
    AuthenticationService,
    LoggedService
} from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'admin-top-menu',
    templateUrl: 'admin-top-menu.component.html',
    styleUrls: ['admin-top-menu.component.css']
})

export class AdminTopMenuComponent implements OnInit {
    public selectedLang: string;
    currentUser: User;

    constructor(
        private _translate: TranslateService,
        private authenticationService: AuthenticationService,
        private loggedService: LoggedService,
        private router: Router,
    ) {
        this.getUserFromLS();
        this.loggedService.getLogged().subscribe(logged => {
            this.getUserFromLS();
        });
    }

    getUserFromLS() {
        const userData: any = localStorage.getItem('currentUser');
        this.currentUser = !!userData ? JSON.parse(userData) : null;
    }

    ngOnInit() {
        $(document).foundation();
        this._translate.getCurentLang().subscribe((lang: string) => {
            this.selectedLang = lang;
        });
    }

    logout() {
        this.currentUser = null;
        this.authenticationService.logout();
    }
}
