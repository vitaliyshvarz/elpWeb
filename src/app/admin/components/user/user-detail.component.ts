import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { User }                     from '../../../core/@core';
import { UserService }              from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnInit {
    private user: User;
    @Input('currentUser') currentUser: boolean;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        if (!this.currentUser) {
            this.route.params.forEach((params: Params) => {
                let id = params['id'];
                this.userService.getById(id)
                    .subscribe((user: User) => this.user = user);
            });
        } else {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
        }

    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.userService.update(this.user)
            .subscribe(() => {
                let currentPopUp = new (<any>Foundation.Reveal)($('#editUserResultModal'));
                currentPopUp.open();
            });
    }

}
