import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from '@core';
import { PlaceService } from '@core';

import { User } from '@core';
import { UserService } from '@core';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',

})

export class DashboardComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  places: Place[] = [];

  constructor(
    private router: Router,
    private placeService: PlaceService,
    private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit():void {
    this.loadAllUsers();
    this.loadAllPlaces()
  }

  // initially get places
  private loadAllPlaces() {
    this.placeService.getPlaces()
      .then((places: Place[]) => this.places = places);
  }
  // initially get users
  private loadAllUsers() {
    this.userService.getAll()
      .subscribe((users: User[]) => { this.users = users; });
  }

  // delete user by id
  deleteUser(id: string) {
    this.userService.delete(id)
      .subscribe(() => { this.loadAllUsers() });
  }

  /*
  * Go to place detail page
  * @param place
  */
  gotoDetail(place: Place): void {
    let link = ['/detail', place.id];
    this.router.navigate(link);
  }
}
