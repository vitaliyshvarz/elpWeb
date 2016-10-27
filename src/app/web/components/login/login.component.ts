import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { AuthenticationService } from '@core';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class WebLoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
    .subscribe(
      (data: any) => {
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.alertService.error(error);
        this.loading = false;
    });
  }
}
