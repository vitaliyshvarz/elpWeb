import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.css']
})

export class WebLoginRegisterComponent implements OnInit {
  login: boolean;
  ngOnInit() {
    this.login = true;
  }
}
