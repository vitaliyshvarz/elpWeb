import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@core';

import { User } from '@core';

@Component({
  moduleId: module.id,
  selector: 'top-menu',
  templateUrl:'top-menu.component.html',
  styleUrls: ['top-menu.component.css']
})

export class TopMenuComponent implements OnInit{
  public selectedLang: string;
  currentUser: User;

  constructor(private _translate: TranslateService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    /* tslint:disable */
    $(document).foundation();
    /* tslint:enable */
    this.selectedLang = this._translate.currentLang;
  }
}
