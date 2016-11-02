import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../core/@core';

import { User } from '../../../core/@core';
import { AuthenticationService } from '../../../core/@core';

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
        private authenticationService: AuthenticationService
    ) {
        const userData: any = localStorage.getItem('currentUser');
        this.currentUser = !!userData ? JSON.parse(userData) : null;
    }

    ngOnInit() {
        $(document).foundation();
        this.selectedLang = this._translate.currentLang;
    }
    logout() {
        this.authenticationService.logout();
    }
}
