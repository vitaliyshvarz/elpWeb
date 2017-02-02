import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'about-us.component.html',
    styleUrls: ['about-us.component.css']
})

export class AboutUsComponent implements OnInit {
    users: boolean;

    ngOnInit() {
        this.users = true;
    }
}
