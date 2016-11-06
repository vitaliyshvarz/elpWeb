import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    templateUrl: 'login-register.component.html',
    styleUrls: ['login-register.component.css']
})

export class WebLoginRegisterComponent implements OnInit {
    login: boolean;
    showContinueButton: boolean = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.login = true;
        this.userService.registerationSuccess().subscribe(() => {
            this.showContinueButton = true;
        });

    }
}
