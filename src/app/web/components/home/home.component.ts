import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../translate/index';

@Component({
  moduleId: module.id,
  selector: 'web-home',
  templateUrl:'home.component.html',
  styleUrls: ['home.component.css']
})

export class WebHomeComponent implements OnInit {



  public translatedText: string;
  public supportedLangs: any[];
  public selectedLang: string;

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    // standing data
    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Deutsch', value: 'de' }
    ];

    // set current langage
    this.selectLang('en');
    this.selectedLang = this._translate.currentLang;


    $(document).foundation();
    // hide white background from foundation for video
    $('.off-canvas-content').css('background', 'transparent');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
      // set current lang;
      this._translate.use(lang);
      this.refreshText();
      this.selectedLang = this._translate.currentLang;
  }

  refreshText() {
      // refresh translation when language change
      this.translatedText = this._translate.instant('hello world');
  }
}
