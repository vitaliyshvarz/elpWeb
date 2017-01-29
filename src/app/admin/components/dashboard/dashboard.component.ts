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
    private currentUser: User;
    private userPlaces: any;
    private users: User[] = [];
    private places: Place[] = [];
    private currentPopUp: any;
    private selectedItem: User | Place;


    constructor(
        private router: Router,
        private placeService: PlaceService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadAllUsers();
        this.loadAllPlaces();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
                this.places = places;
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
    private deleteUser(id: string): void {
        this.userService.delete(id)
            .subscribe(() => {
                this.loadAllUsers();
            });
    }

    // delete user by id
    private deletePlace(id: string): void {
        this.placeService.delete(id)
            .subscribe(() => {
                this.loadAllPlaces();
            });
    }

    deleteItem(id: string) {
        return this.deleteType === 'Place' ? this.deletePlace(id) : this.deleteUser(id);
    }

    openConfirmPopUp(item: User | Place, type: string) {
        this.deleteType = type;
        this.currentPopUp = new Foundation.Reveal($('#deleteModal'));
        this.selectedItem = item;
        console.log(this.selectedItem);
        this.currentPopUp.open();
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
