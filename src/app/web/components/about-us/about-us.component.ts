import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'about-us.component.html',
    styleUrls: ['about-us.component.css']
})

export class AboutUsComponent {
    users: boolean;

    constructor(
    ) { }

    ngOnInit() {
        this.users = true;

    }
}
