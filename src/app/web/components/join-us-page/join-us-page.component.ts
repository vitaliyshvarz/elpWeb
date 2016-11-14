import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/@core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LoggedService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    templateUrl: 'join-us-page.component.html',
    styleUrls: ['join-us-page.component.css']
})

export class JoinUsPageComponent implements OnInit {
    currentUser: User;

    constructor(
        private loggedService: LoggedService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getUserFromLS();
        this.loggedService.getLogged().subscribe(logged => {
            this.getUserFromLS();
        });
    }

    getUserFromLS() {
        const userData: any = localStorage.getItem('currentUser');
        this.currentUser = !!userData ? JSON.parse(userData) : null;
    }
}
