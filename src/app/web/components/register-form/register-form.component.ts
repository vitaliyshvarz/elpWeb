import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core';
import { AlertService } from '../../services/alert.service'


@Component({
  moduleId: module.id,
  selector: 'register-form',
  templateUrl: 'register.component.html'
})

export class WebRegisterFormComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        (data: any) => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
