import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/@core';
import { LoggedService } from '../../../core/@core';
import { AuthenticationService } from '../../../core/@core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class AppComponent implements OnInit {
  currentUser: User;

  constructor(
    private loggedService: LoggedService,
    private authenticationService: AuthenticationService
  ) {
    this.getUserFromLS();
    this.loggedService.getLogged().subscribe(logged => {
      this.getUserFromLS();
    });
  }

  getUserFromLS() {
    const userData: any = localStorage.getItem('currentUser');
    this.currentUser = !!userData ? JSON.parse(userData) : null;
  }

  ngOnInit() {
    $(document).foundation();
    $('.off-canvas a').on('click', () => {
      $('.off-canvas').foundation('close');
    });
  }

  logout() {
    this.currentUser = null;
    this.authenticationService.logout();
  }
}
