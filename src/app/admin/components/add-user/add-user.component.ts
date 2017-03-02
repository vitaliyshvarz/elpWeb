import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Location }                 from '@angular/common';
import { User }                     from '../../../core/@core';
import { UserService }              from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'add-user',
    templateUrl: 'add-user.component.html',
    styleUrls: ['add-user.component.css']
})
export class AddUserComponent implements OnInit, OnInit {
    private user: User;
    @Input('currentUser') currentUser: boolean;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.user = new User();
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.userService.create(this.user)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#addUserResultModal'));
                currentPopUp.open();
            });
    }

}
