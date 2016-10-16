import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <nav>
     <a routerLink="/admin" routerLinkActive="active">Admin Panel</a>
   </nav>
    <router-outlet>
  `
})

export class AppComponent {
  title = 'EatLikePro App';
}
