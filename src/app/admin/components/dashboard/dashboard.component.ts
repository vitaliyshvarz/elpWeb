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

    private filterUserPlaces(places): Place[] {
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
    private loadAllPlaces(): void {
        this.placeService.getAll()
            .subscribe((places: Place[]) => {
                this.userPlaces = this.filterUserPlaces(places);
                this.places = places
            });
    }
    // initially get users
    private loadAllUsers(): void {
        this.userService.getAll()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }

    // delete user by id
    deleteUser(id: string): void {
        this.userService.delete(id)
            .subscribe(() => {
                this.loadAllUsers();
            });
    }

    // delete user by id
    deletePlace(id: string): void {
        this.placeService.delete(id)
            .subscribe(() => {
                this.loadAllPlaces();
            });
    }
    /*
    * Go to place detail page
    * @param place
    */
    gotoDetail(type, item): void {
        let link = [`/admin/${type}-detail`, item.id];
        this.router.navigate(link);
    }
}
