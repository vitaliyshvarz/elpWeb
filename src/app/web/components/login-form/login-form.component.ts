import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

import { AuthenticationService } from '../../../core/@core';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login-form.component.html'
})

export class WebLoginFormComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    const context = this;
    new (<any>Foundation.Abide)($('form'), {});

    $('form').on('formvalid.zf.abide', function() {
      context.login();
    });

  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
    .subscribe(
      (data: any) => {
        this.alertService.success('Login successful', true);
        this.loading = false;
      },
      (error: any) => {
        this.alertService.error(error);
        this.loading = false;
    });
  }
}
