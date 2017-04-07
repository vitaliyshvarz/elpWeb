import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { User, AuthenticationService }  from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'admin-main',
    templateUrl: 'admin-main.component.html',
    styleUrls: ['admin-main.component.css']
})

export class MainAdminComponent implements OnInit {
    private currentUser: User;
    title: string = 'Admin Panel EatLikePro';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        this.currentUser = null;
        this.authenticationService.logout();
    }
}
