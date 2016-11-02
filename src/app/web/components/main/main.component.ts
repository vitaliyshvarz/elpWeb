import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css']
})

export class AppComponent implements OnInit {
    currentUser: User;

    constructor() {
        const userData: any = localStorage.getItem('currentUser');
        this.currentUser = !!userData ? JSON.parse(userData) : null;
    }
    ngOnInit() {
        $(document).foundation();
    }
}
