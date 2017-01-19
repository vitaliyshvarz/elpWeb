import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { User }                     from '../../../core/@core';
import { UserService }              from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
    private user: User;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.userService.getById(id)
                .subscribe((user: User) => this.user = user);
        });
    }
    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.userService.update(this.user)
            .subscribe(() => this.goBack());
    }

}
