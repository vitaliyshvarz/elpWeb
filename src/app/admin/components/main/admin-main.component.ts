import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User }              from '../../../core/@core';

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
        private router: Router
    ) { }
    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}
