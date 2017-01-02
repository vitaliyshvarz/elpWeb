import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../core/@core';

import { User } from '../../../core/@core';
import { AuthenticationService } from '../../../core/@core';

import { LoggedService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html',
    styleUrls: ['top-menu.component.css']
})

export class TopMenuComponent implements OnInit {
    public selectedLang: string;
    currentUser: User;

    constructor(
        private _translate: TranslateService,
        private authenticationService: AuthenticationService,
        private loggedService: LoggedService
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
