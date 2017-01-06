import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '../../../core/@core';
import { PlaceService } from '../../../core/@core';

import { User } from '../../../core/@core';
import { UserService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',

})

export class DashboardComponent implements OnInit {
    currentUser: User;
    userPlaces: any;
    users: User[] = [];
    places: Place[] = [];

    constructor(
        private router: Router,
        private placeService: PlaceService,
        private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.loadAllUsers();
        this.loadAllPlaces();
    }

    private filterUserPlaces(places) {
        if (this.currentUser && this.currentUser) {
            return places.filter(place => {
                if (place.user && place.user.id &&
                    this.currentUser && this.currentUser.id) {
                    return place.user.id === this.currentUser.id;
                }
            });
        }
    }

    // initially get places
    private loadAllPlaces() {
        this.placeService.getAll()
            .subscribe((places: Place[]) => {
                this.userPlaces = this.filterUserPlaces(places);
                this.places = places
            });
    }
    // initially get users
    private loadAllUsers() {
        this.userService.getAll()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }

    // delete user by id
    deleteUser(id: string) {
        this.userService.delete(id)
            .subscribe(() => {
                this.loadAllUsers();
            });
    }

    /*
    * Go to place detail page
    * @param place
    */
    gotoDetail(place: Place): void {
        let link = ['/admin/detail', place.id];
        this.router.navigate(link);
    }
}
