import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/@core';

@Component({
  moduleId: module.id,
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css']
})

export class PageNotFoundComponent implements OnInit {
  private currentUser: User;

  constructor(
    private router: Router, ) { }

  ngOnInit(): void {
    const userData: any = localStorage.getItem('currentUser');
    this.currentUser = !!userData ? JSON.parse(userData) : null;
  }


}
