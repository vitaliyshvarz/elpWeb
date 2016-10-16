import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../translate/index';

@Component({
  moduleId: module.id,
  selector: 'web-home',
  templateUrl:'home.component.html'
})

export class WebHomeComponent implements OnInit {

  public translatedText: string;
  public supportedLangs: any[];

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    // standing data
    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Deutsch', value: 'de' }
    ];

    // set current langage
    this.selectLang('es');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
      // set current lang;
      this._translate.use(lang);
      this.refreshText();
  }

  refreshText() {
      // refresh translation when language change
      this.translatedText = this._translate.instant('hello world');
  }
}
