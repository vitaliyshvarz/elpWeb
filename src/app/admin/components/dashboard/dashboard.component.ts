import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '../../../core/@core';
import { PlaceService } from '../../../core/@core';

import { Meal } from '../../../core/@core';
import { MealService } from '../../../core/@core';

import { User } from '../../../core/@core';
import { UserService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    private currentUser: User;
    private userPlaces: any;
    private users: User[] = [];
    private places: Place[] = [];
    private meals: Meal[] = [];
    private currentPopUp: any;
    private selectedItem: User | Place | Meal;
    private selectedTab: any = 'Overview';
    private deleteType: string;
    private tabs: any = [
        { name: 'Overview', active: true },
        { name: 'Users', active: false },
        { name: 'Places', active: false },
        { name: 'Meals', active: false },
        { name: 'Settings', active: false },
    ];


    constructor(
        private router: Router,
        private placeService: PlaceService,
        private mealService: MealService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadAllMeals();
        this.loadAllUsers();
        this.loadAllPlaces();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    private filterUserPlaces(places: Place[]): Place[] {
        if (this.currentUser && this.currentUser) {
            return places.filter(place => {
                if (place.user && place.user.id &&
                    this.currentUser && this.currentUser.id) {
                    return place.user.id === this.currentUser.id;
                }
            });
        }
    }

    // initially get meals
    private loadAllMeals(): void {
        this.mealService.getAll()
            .subscribe((meals: Meal[]) => {
                this.meals = meals;
            });
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
    private deleteMeal(id: string): void {
        this.mealService.delete(id)
            .subscribe(() => {
                this.loadAllMeals();
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
        switch (this.deleteType) {
            case 'Place':
                this.deletePlace(id);
                break;
            case 'User':
                this.deleteUser(id);
                break;
            case 'Meal':
                this.deleteMeal(id);
                break;
            default:
                break;
        }
    }

    openConfirmPopUp(item: User | Place | Meal, type: string) {
        this.deleteType = type;
        this.currentPopUp = Foundation.Reveal($('#deleteModal'));
        this.selectedItem = item;
        this.currentPopUp.open();
    }

    gotToPage(page: string): void {
        let link = [`${page}`];
        this.router.navigate(link);
    }

    /*
    * Go to place detail page
    * @param place
    */
    gotoDetail(type: any, item: any): void {
        let link = [`/admin/${type}-detail`, item.id];
        this.router.navigate(link);
    }

    selectTab(name: string): void {

        this.tabs.forEach((tab: any) => {
            if (tab.name === name) {
                tab.active = true;
                this.selectedTab = tab.name;
            } else {
                tab.active = false;
            }
        });
    }
}
