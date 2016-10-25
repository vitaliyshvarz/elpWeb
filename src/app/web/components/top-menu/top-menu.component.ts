import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../translate/index';

@Component({
  moduleId: module.id,
  selector: 'top-menu',
  templateUrl:'top-menu.component.html',
  styleUrls: ['top-menu.component.css']
})

export class TopMenuComponent implements OnInit{
  public selectedLang: string;

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    this.selectedLang = this._translate.currentLang;
  }
}
