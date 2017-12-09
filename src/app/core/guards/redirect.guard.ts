import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const params = window.location.hash.substr(1);

    if (params.indexOf('id_token') > -1) {
      this.router.navigate(['/login-register', 'id_token']);
    } else {
      return true;
    }
  }
}
